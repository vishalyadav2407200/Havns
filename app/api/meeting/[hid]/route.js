"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import Meeting from "@models/meeting";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

//fetch meeting for host with particular hall id (hid == hallid)
export const GET = async (res, { params }) => {
  try {
    await connectToDB();
    const hallId = new mongoose.Types.ObjectId(params.hid);
    const session = await getServerSession(authOptions);
    const resp = await Meeting.find({ host: session?.user._id, hall: hallId });
    return new Response(JSON.stringify(resp), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
