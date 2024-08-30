"use server";
import bcrypt from "bcrypt";
import User from "@models/user";
import { redirect } from "next/navigation";
import { generateToken, verifyToken } from "@utils/token";
import sendEmail from "@utils/sendmail";

export async function signUpWithCredentials(data) {
  const BASE_URL = process.env.NEXTAUTH_URL;
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      throw new Error("User already exists");
    }

    data.password = await bcrypt.hash(data.password, 12);

    const token = generateToken({ user: data });

    await sendEmail({
      to: data.email,
      url: `${BASE_URL}/verify?token=${token}`,
      text: "Verify Email",
    });

    return { msg: "Check MailBox, Verify Your Email" };
  } catch (e) {
    console.error("Error in signUpWithCredentials:", e);
    return { msg: e.message };
  }
}

export async function verifyWithCredentials(token) {
  try {
    const { user } = verifyToken(token);

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return { msg: "Verification successful" };
    }

    const newUser = new User(user);
    await newUser.save();

    return { msg: "Your account is successfully verified !!" };
  } catch (e) {
    console.error("Error in verifyWithCredentials:", e);
    return { msg: e.message };
  }
}
