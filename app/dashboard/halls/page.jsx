"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Halls = () => {
  const [hostHalls, setHostHalls] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("/api/hall/host");
        const result = await res.json();

        const photoPromises = result.map(async (hall) => {
          const photoRes = await fetch(`/api/photo/${hall._id}`);
          return photoRes.json();
        });

        const photoData = await Promise.all(photoPromises);

        const finalResult = result.map((hall, idx) => {
          return {
            ...hall,
            photo: photoData[idx],
          };
        });

        setHostHalls(finalResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetcher();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center text-lg">
        <div className="text-xl font-semibold">Your Halls</div>
        <div className="flex flex-col gap-3">
          {hostHalls.length > 0 &&
            hostHalls.map((hall) => {
              const backgroundStyle = {
                backgroundImage: `url(${hall.photo.secure_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              };

              return (
                <Link
                  key={hall._id}
                  href={`/dashboard/halls/${hall._id}/editor`}
                >
                  <div
                    className="border border-gray-800 rounded-md py-10 px-3 relative"
                    style={backgroundStyle}
                  >
                    <div className="text-xl text-white font-extrabold">
                      {hall.title}
                    </div>
                    <div className="text-white font-bold">{hall.location}</div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Halls;
