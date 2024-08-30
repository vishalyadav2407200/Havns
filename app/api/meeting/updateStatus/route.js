"use server";
import Meeting from "@models/meeting";
import connectToDB from "@utils/database";

export const PUT = async (req, res) => {
  try {
    await connectToDB();
    const { answer, id } = await req.json();
    await Meeting.findOneAndUpdate({ _id: id }, { status: answer });
    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
};
