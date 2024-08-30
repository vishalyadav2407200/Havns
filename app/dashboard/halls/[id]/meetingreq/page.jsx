"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { parseISO, format } from "date-fns";
import Link from "next/link";

const meetingreq = () => {
  const [ButtonCond, setButtonCond] = useState(true);
  const [Meetings, setMeetings] = useState([]);
  const path = usePathname();
  const hallId = path.substring(17, 41);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/meeting/${hallId}`);

      if (res.status === 200) {
        const result = await res.json();
        const res1 = result.map(async (meet) => {
          const userRes = await fetch(`/api/hosts/${meet.user}`);
          return userRes.json();
        });
        const userData = await Promise.all(res1);
        const finalData = result.map((meet, idx) => {
          return {
            ...meet,
            name: userData[idx].name,
            email: userData[idx].email,
          };
        });
        setMeetings(finalData);
        setButtonCond(false);
      }
    };
    fetcher();
  }, [hallId]);

  const respond = async (decision, meet) => {
    try {
      if (decision === "accepted") {
        const res1 = await fetch(`/api/zoom/token`, {
          method: "GET",
        });
        const token = await res1.json();
        const res2 = await fetch(`/api/zoom/meeting`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: "Virtual Meeting",
            type: 2,
            start_time: "2023-01-01T12:00:00Z",
            duration: 60,
            timezone: "IST",
            id: meet._id,
            access_token: token,
          }),
        });
        const meetingData = await res2.json();
        meet.start_url = meetingData.start_url;
      }
      await fetch("/api/meeting/updateStatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: decision, id: meet._id }),
      });
      meet.status = decision === "accepted" ? "accepted" : "declined";
      setMeetings([...Meetings]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-lg my-4 font-semibold">Meeting Requests</div>
      <div className="flex flex-col gap-4">
        {Meetings.map((meet, i) => (
          <div key={i} className="border rounded-md bg-white p-4">
            <div className="flex justify-between gap-5 items-center">
              <div className="py-1 flex flex-col">
                <span className="font-semibold">{meet.name}</span>
                <span className="font-normal text-sm text-gray-700">
                  {meet.email}
                </span>
                <div>
                  <span>
                    {format(parseISO(meet.meetDate), "dd MMMM yyyy")},{" "}
                  </span>
                  <span>
                    {format(parseISO(`1970-01-01T${meet.meetTime}`), "hh:mm a")}
                    ,
                  </span>
                </div>
              </div>
              {meet.status === "pending" ? (
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => respond("accepted", meet)}
                    disabled={ButtonCond}
                    className="bg-black text-white font-semibold px-3 py-2 rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respond("declined", meet)}
                    disabled={ButtonCond}
                    className="border-2 border-black font-semibold text-black px-3 py-2 rounded-md"
                  >
                    Decline
                  </button>
                </div>
              ) : meet.status === "accepted" ? (
                <Link
                  href={meet.meeting.start_url}
                  className="text-blue-500 font-semibold"
                >
                  Join Meeting
                </Link>
              ) : (
                <span>Declined</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default meetingreq;
