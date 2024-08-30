"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

const meet = () => {
  const [PermanentData, setPermanentData] = useState([]);
  const [ActiveData, setActiveData] = useState([]);
  const [ActiveTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/meeting/user");
        const result = await response.json();
        const res1 = result.map(async (meet) => {
          const hallRes = await fetch(`/api/hall/${meet.hall}/?meet=true`);
          return hallRes.json();
        });
        const hallData = await Promise.all(res1);
        const finalData = result.map((meet, idx) => {
          return {
            ...meet,
            title: hallData[idx].title,
            location: hallData[idx].location,
          };
        });
        setPermanentData(finalData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setActiveData(PermanentData.filter((item) => item.status == ActiveTab));
  }, [ActiveTab, PermanentData]);

  return (
    <div>
      <div className="flex flex-1 justify-around items-center gap-5 border border-black rounded-md">
        <button
          className={`w-full flex justify-center border-r border-black py-2 ${ActiveTab === "accepted" ? "font-semibold underline" : ""}`}
          onClick={() => setActiveTab("accepted")}
        >
          Accepted
        </button>
        <button
          className={`w-full flex justify-center border-r border-black py-2 ${ActiveTab === "pending" ? "font-semibold underline" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`w-full flex justify-center py-2 ${ActiveTab === "declined" ? "font-semibold underline" : ""}`}
          onClick={() => setActiveTab("declined")}
        >
          Declined
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <h2 className="text-lg font-medium">
          {ActiveTab.slice(0, 1).toUpperCase().concat(ActiveTab.slice(1))}{" "}
          Requests
        </h2>
        <div className="border border-gray-100 flex flex-col gap-3 rounded-md bg-white p-2">
          {ActiveData?.map((item) => (
            <span key={item._id}>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-medium">{item.title}</p>
                  <p>{item.location}</p>
                </div>
                <div>
                  <p>
                    {ActiveTab == "pending" ? (
                      <span>&#9679;</span>
                    ) : ActiveTab == "accepted" ? (
                      <span className="text-green-500">&#9679;</span>
                    ) : (
                      <span className="text-red-500">&#9679;</span>
                    )}{" "}
                    Status:{" "}
                    {item.status
                      .slice(0, 1)
                      .toUpperCase()
                      .concat(ActiveTab.slice(1))}
                  </p>
                  <p>
                    {format(parseISO(item.meetDate), "dd MMMM yyyy")},{" "}
                    {format(parseISO(`1970-01-01T${item.meetTime}`), "hh:mm a")}
                  </p>
                  {ActiveTab === "accepted" && item.meeting && (
                    <Link
                      href={item.meeting.join_url}
                      target="_blank"
                      className="text-blue-500"
                    >
                      Join URL
                    </Link>
                  )}
                </div>
              </div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default meet;
