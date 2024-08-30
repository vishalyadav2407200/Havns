"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import User from "@models/user";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function updateUserRole() {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session) {
      await User.findByIdAndUpdate(
        { _id: session?.user._id },
        { role: "host" },
      );
      return { msg: "success" };
    } else {
      return { msg: "error" };
    }
  } catch (error) {
    return { msg: "error" };
  }
}
export async function updateUser(name, email, image) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session) {
      const updateFields = {};
      if (name) {
        updateFields.name = name;
      }
      if (email) {
        updateFields.email = email;
      }
      if (image) {
        updateFields.image = image;
      }
      await User.findByIdAndUpdate(session?.user._id, updateFields);
      return { msg: "success" };
    } else {
      return { msg: "error" };
    }
  } catch (error) {
    return { msg: "error" };
  }
}
export async function updateUserBooking(bookingObj) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session) {
      await User.findByIdAndUpdate(
        { _id: session?.user._id },
        { $push: { booked: bookingObj } },
      );
      return { msg: "success" };
    } else {
      return { msg: "error" };
    }
  } catch (error) {
    return { msg: "error" };
  }
}

export async function hallLiker(id) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session) {
      await User.findByIdAndUpdate(
        { _id: session.user._id },
        { $push: { liked: id } },
      );
      return { msg: "success" };
    } else {
      return { msg: "log in" };
    }
  } catch (error) {
    return { msg: "unexpected error" };
  }
}

export async function hallDisliker(id) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session) {
      await User.findOneAndUpdate(
        { _id: session.user._id },
        { $pull: { liked: id } },
      );
      return { msg: "success" };
    } else {
      return { msg: "log in" };
    }
  } catch (e) {
    return { msg: "unexpected error" };
  }
}
