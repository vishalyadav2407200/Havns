"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const newHall = await Hall.create({
      host: session?.user._id,
    });
    const responseData = {
        _id:newHall._id,
    }
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
