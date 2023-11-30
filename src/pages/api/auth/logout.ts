export async function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": `app_auth_token=""; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly`,
    },
  });
}
