"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import Meeting from "@models/meeting";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session?.user._id) {
      const { date, time, host, hall } = await req.json();
      await Meeting.create({
        host: new mongoose.Types.ObjectId(host),
        user: session.user._id,
        hall: new mongoose.Types.ObjectId(hall),
        meetDate: date,
        meetTime: time,
      });
      return new Response("success", { status: 200 });
    } else {
      throw new Response("Please Log in ", { status: 505 });
    }
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
