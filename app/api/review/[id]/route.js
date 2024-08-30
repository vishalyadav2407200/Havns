"use server";
import connectToDB from "@utils/database";
import Review from "@models/review";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const query = req.nextUrl.searchParams.get("total");
    if (query) {
      const review = await Review.find({ HallId: params.id });
      var avgStars = null;
      for (var i = 0; i < review.length; i++) {
        avgStars = avgStars + review[i].stars;
      }
      avgStars = avgStars / review.length;
      const obj = {
        stars: avgStars,
        total: review.length,
      };
      return new Response(JSON.stringify(obj), { status: 200 });
    }
    const review = await Review.find({ HallId: params.id });
    return new Response(JSON.stringify(review), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
