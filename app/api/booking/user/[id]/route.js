import connectToDB from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);
    return new Response(JSON.stringify(user.booked), { status: 200 });
  } catch (error) {
    return new Response({ msg: "error" }, { status: 500 });
  }
};
