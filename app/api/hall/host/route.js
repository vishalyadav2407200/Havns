import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const res = await Hall.find({ host: session.user._id, done: true });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response({ msg: error.message }, { status: 500 });
  }
};
