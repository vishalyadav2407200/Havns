import User from "@models/user";
import connectToDB from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const user = await User.findOne({ _id: params.id });
    if (!user) {
      return new Response(JSON.stringify({ msg: "User not found" }), {
        status: 404,
      });
    }
    const result = {
      liked: user.liked,
    };
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
};
