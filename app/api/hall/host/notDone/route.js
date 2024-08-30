import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const halls = await Hall.find({ host: session.user._id, done: false });
    const photoData = await Promise.all(
      halls.map(async (hall) => {
        const photoRes = await fetch(
          `${process.env.CLIENT_URL}/api/photo/${hall._id}`,
        );
        return photoRes.json();
      }),
    );
    const finalData = halls.map((hall, idx) => ({
      ...hall.toObject(), // Convert Mongoose document to plain JavaScript object
      photo: photoData[idx] ? true : false,
    }));
    return new Response(JSON.stringify(finalData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
};
