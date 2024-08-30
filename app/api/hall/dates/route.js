import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { updateUserBooking } from "@actions/userActions";

export const POST = async (req) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session === null) {
      throw new Error("Please sign in!!");
    }

    const { dates, hallId } = await req.json();
    const bookingObjForHall = {
      user: session?.user._id,
      dates,
    };
    const hall_id = new mongoose.Types.ObjectId(hallId);
    const bookingObjForUser = {
      hall: hall_id,
      dates,
    };

    await Hall.findOneAndUpdate(
      { _id: hall_id },
      { $push: { booked: bookingObjForHall } }
    );

    await updateUserBooking(bookingObjForUser);
    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
