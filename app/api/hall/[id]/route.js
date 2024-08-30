import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const meet = req.nextUrl.searchParams.get("meet");
    const res = await Hall.findOne({ _id: params.id });
    if (meet) {
      const hallData = {
        ...res.toObject(),
      };
      const finalObj = {
        title: hallData.title,
        location: hallData.location,
      };
      return new Response(JSON.stringify(finalObj), { status: 200 });
    }
    if (res.host == session?.user._id) {
      return new Response(JSON.stringify(res), { status: 200 });
    } else {
      return new Response(JSON.stringify(res), { status: 404 });
    }
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
