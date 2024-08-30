"use server";
import Meeting from "@models/meeting";
import connectToDB from "@utils/database";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    //prettier-ignore
    const { topic, type, start_time, duration, timezone, id ,access_token} = await req.json();

    const ID = new mongoose.Types.ObjectId(id);

    const zoomreq = await fetch(
      `https://api.zoom.us/v2/users/${process.env.ZOOM_USER_ID}/meetings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          topic: topic,
          type: type,
          start_time: start_time,
          duration: duration,
          timezone: timezone,
        }),
      }
    );
    const data = await zoomreq.json();
    await Meeting.findByIdAndUpdate(
      { _id: ID },
      {
        meeting: {
          start_url: data.start_url,
          join_url: data.join_url,
        },
      }
    );
    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
