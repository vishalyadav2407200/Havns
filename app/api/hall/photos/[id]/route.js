"use server";
import Photo from "@models/photos";
import connectToDB from "@utils/database";
import mongoose from "mongoose";

export const GET = async (res, { params }) => {
  try {
    await connectToDB();
    const hallId = new mongoose.Types.ObjectId(params.id);
    const res = await Photo.find({ location: hallId });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
