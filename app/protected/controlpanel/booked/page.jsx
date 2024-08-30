"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import WriteReview from "@components/rating/write";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const Booked = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [halls, setHalls] = useState([]);
  const [reviewHallId, setReviewHallId] = useState(null);
  const [showReviewBox, setShowReviewBox] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      try {
        if (session) {
          const response = await fetch(`/api/booking/user/${session.user._id}`);
          const bookingsData = await response.json();
          setBookings(bookingsData);

          const hallsPromises = bookingsData.map((booking) =>
            fetch(`/api/hall/${booking.hall}`),
          );
          const hallsResponses = await Promise.all(hallsPromises);
          const hallsData = await Promise.all(
            hallsResponses.map((response) => response.json()),
          );
          setHalls(hallsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetcher();
  }, [session]);

  const handleShowReview = (hallId) => {
    setReviewHallId(hallId);
    setShowReviewBox((prev) => !prev);
  };

  return (
    <div>
      <h2 className="font-semibold text-xl py-2">Your Reservations</h2>
      <div className="flex flex-col gap-3 rounded-md">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="flex bg-white rounded-lg border border-gray-100 p-3 gap-2 flex-col"
          >
            <div className="flex justify-between">
              {halls[index] && (
                <div className="text-lg font-medium">
                  <p>{halls[index].title}</p>
                </div>
              )}
              <div className="flex underline-offset-4 rounded-md gap-2 font-medium px-3 underline">
                <p>{format(new Date(booking.dates.start), "dd MMMM yyyy")}</p>
                {"-"}
                <p> {format(new Date(booking.dates.end), "dd MMMM yyyy")}</p>
              </div>
            </div>
            <div>
              {halls[index] && (
                <div>
                  <p>{halls[index].description.slice(0, 490)}...</p>
                </div>
              )}
              {new Date() > new Date(booking.dates.end) && (
                <button
                  className="bg-black text-white font-medium text-md mt-3 rounded-md p-1 px-2 "
                  onClick={() => handleShowReview(halls[index]?._id)}
                >
                  Write a Review
                </button>
              )}
              <AnimatePresence>
                {showReviewBox && reviewHallId === halls[index]?._id && (
                  <motion.div
                    className="mt-3"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <WriteReview Id={reviewHallId} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booked;
