"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useReward } from "react-rewards";

const Page = () => {
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const [Counter, setCounter] = useState(5);
  useEffect(() => reward(), []);
  setInterval(() => {
    if (Counter > 0) {
      setCounter(Counter - 1);
    }
  }, 1000);
  const router = useRouter();
  if (Counter === 0) {
    router.push("/dashboard/halls");
  }
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-5">
        <span id="rewardId" />
        <h1 className="text-6xl text-rose-500 font-extrabold">
          {" "}
          Congratulations !!{" "}
        </h1>
        <h3 className="text-xl font-semibold">
          {" "}
          Your place has been successfully registered.
        </h3>
        <p className="text-lg">
          You will be automatically redirected to your Dashboard in{" "}
          <span className="font-bold">{Counter}s</span>
        </p>
      </div>
    </>
  );
};

export default Page;
