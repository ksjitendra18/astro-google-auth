import jwt from "jsonwebtoken";

export type UserSession = {
  name: string;
  email: string;
  picture: string;
};

type ParsedCookieValue = {
  name: string;
  email: string;
  picture: string;
  exp: number;
};

export function parseAppAuthToken(
  cookieHeader: string | null
): string | undefined {
  if (!cookieHeader || typeof cookieHeader !== "string") {
    return undefined;
  }
  const cookiesArray = cookieHeader.split(";");
  const authTokenCookie = cookiesArray.find((cookie) =>
    cookie.trim().startsWith("app_auth_token=")
  );

  if (!authTokenCookie) {
    return undefined;
  }

  const parts = authTokenCookie.split("=");
  if (parts.length === 2) {
    return parts[1].trim();
  }

  return undefined;
}

export function getUserSession(request: Request) {
  try {
    const session: UserSession = {
      email: "",
      name: "",
      picture: "",
    };

    const cookies = parseAppAuthToken(request.headers.get("Cookie"));

    if (!cookies) {
      return null;
    }

    const decodedCookieValue = jwt.verify(
      cookies,
      import.meta.env.SECRET_KEY
    ) as ParsedCookieValue;

    if (
      decodedCookieValue &&
      new Date(decodedCookieValue.exp * 1000).getTime() >= new Date().getTime()
    ) {
      session["email"] = decodedCookieValue.email;
      session["name"] = decodedCookieValue.name;
      session["picture"] = decodedCookieValue.picture;
      return session;
    }
  } catch (error) {
    console.log("Error while parsing user session", error);
    return null;
  }
}
