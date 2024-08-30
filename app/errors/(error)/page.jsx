"use client";
import { useRouter, useSearchParams } from "next/navigation";
const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errormsg = searchParams.get("error");
  return (
    <div className="text-red-600 text-2xl left-[13rem] top-1/3 absolute">
      {errormsg}
      <br />
      <button onClick={() => router.back()} className="underline">
        Try again
      </button>
    </div>
  );
};

export default page;
