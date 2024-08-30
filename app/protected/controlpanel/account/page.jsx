"use server";
import Account from "@components/profile/Account";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const profileServerPage = async () => {
  const session = await getServerSession(authOptions);
  const simplifiedUser = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    role: session?.user?.role,
    provider: session?.user?.provider,
  };

  return (
    <div>
      <Account user={simplifiedUser} />
    </div>
  );
};

export default profileServerPage;
