import oauth2Client from "../../../lib/auth/google-oauth-client";

export async function GET() {
  try {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "openid email profile",
      prompt: "consent",
    });
    return new Response(null, {
      status: 302,
      headers: {
        Location: authorizationUrl,
      },
    });
  } catch (error) {
    return new Response("Error while login. Please try again later", {
      status: 500,
    });
  }
}
