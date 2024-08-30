"use server";
import qs from "querystring";

export const GET = async (req, res) => {
  try {
    const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

    const zoomreq = await fetch("https://zoom.us/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: qs.stringify({
        grant_type: "account_credentials",
        account_id: ZOOM_ACCOUNT_ID,
      }),
    });
    const { access_token } = await zoomreq.json();
    return new Response(JSON.stringify(access_token), { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
