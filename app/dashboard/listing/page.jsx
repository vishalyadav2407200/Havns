"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const listing = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/hall/host/notDone", {
        method: "GET",
      });
      const result = await res.json();
      setData(result);
      console.log(result);
    };
    fetcher();
  }, []);

  const redirecter = (hall) => {
    if (!hall.location) {
      router.push(`/protected/become-host/${hall._id}/places`);
    } else if (
      !hall.halls ||
      !hall.seating ||
      !hall.maxcapacity ||
      !hall.lawns
    ) {
      router.push(`/protected/become-host/${hall._id}/capacity`);
    } else if (!hall.veg || !hall.nonveg || !hall.decor || !hall.room) {
      router.push(`/protected/become-host/${hall._id}/prices`);
    } else if (!hall.photo) {
      router.push(`/protected/become-host/${hall._id}/photos`);
    } else {
      router.push(`/protected/become-host/${hall._id}/allset`);
    }
  };

  return (
    <div>
      <div className="font-semibold text-xl">Complete your listing</div>
      <div className="flex flex-col gap-4 mt-5">
        {data?.map((hall) => {
          return (
            <button key={hall} onClick={() => redirecter(hall)}>
              <span className="underline">
                Please complete your pending hall
              </span>
            </button>
          );
        })}
      </div>
      <button className="right-3 top-3 px-3 py-1 bg-black text-white rounded-md font-semibold absolute">
        <Link href={"/protected/become-host"}>Add New Hall</Link>
      </button>
    </div>
  );
};

export default listing;
