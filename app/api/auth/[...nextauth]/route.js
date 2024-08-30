import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDB from "@utils/database";
import User from "@models/user";
import bcrypt from "bcrypt";

connectToDB();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) return { msg: "User not found" };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { msg: "Invalid password" };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/errors",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.type == "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      const user = await getUserByEmail({ email: token.email });
      token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*******************************************************/
const signInWithOAuth = async ({ account, profile }) => {
  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  //if no user
  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });
  await newUser.save();
  return true;
};

const getUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email }).select("-password");
  if (!user) throw new Error("User not found");
  return { ...user._doc, _id: user._id.toString() };
};
