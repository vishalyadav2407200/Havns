"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@components/Loading";
import { useRouter } from "next/navigation";

const page = () => {
  const params = useSearchParams();
  const router = useRouter();
  const hallId = params.get("hall_id");
  const checkoutId = params.get("checkout_id");
  const start = params.get("start");
  const end = params.get("end");

  useEffect(() => {
    const confirmer = async () => {
      const res1 = await fetch("/api/stripe/confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: checkoutId,
        }),
      });
      const result1 = await res1.json();
      if (result1 == "complete") {
        const dates = {
          start,
          end,
        };
        const res2 = await fetch("/api/hall/dates", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ dates, hallId }),
        });
        const result2 = await res2.json();
        if (result2 == "success") {
          router.push("/protected/controlpanel/booked");
        }
      } else {
        router.push("/errors?error=Payment_is_not_done");
      }
    };
    confirmer();
  }, [hallId]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <span className="scale-150">
        <Loading />
      </span>
      <div className="font-bold text-3xl">
        Please wait !! we are confirming your booking....
      </div>
      <span className="text-2xl">Don't refresh the page</span>
    </div>
  );
};

export default page;
