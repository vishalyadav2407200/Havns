"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import Review from "@models/review";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("error", { status: 404 });
    }
    const { Id, Rating, FeedBack } = await req.json();
    const review = new Review({
      HallId: Id,
      name: session.user.name,
      image:session.user.image,
      stars: Rating,
      feedback: FeedBack,
    });
    await review.save();
    return new Response("ok", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
