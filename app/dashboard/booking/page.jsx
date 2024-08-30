"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/hall/host`);
        const result = await res.json();
        const filteredResult = result.filter((res) => res.booked.length > 0);

        const bookingsData = await Promise.all(
          filteredResult.map(async (hall) => {
            const userPromises = hall.booked.map(async (detail) => {
              const response = await fetch(`/api/hosts/${detail.user}`);
              const userData = await response.json();
              return { user: userData, booking: detail };
            });
            const usersData = await Promise.all(userPromises);
            return { hall, usersData };
          }),
        );

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetcher();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-semibold">Your Bookings</div>
      {bookings ? (
        bookings.map(({ hall, usersData }, idx) => (
          <div
            key={idx}
            className="border border-gray-300 p-4 bg-white rounded-lg"
          >
            <h2 className="text-xl font-medium">{hall.title}</h2>
            <p className="text-gray-600">{hall.location}</p>
            <div>
              <ul className="flex flex-col mt-2 gap-3">
                {usersData.map(({ user, booking }) => (
                  <li
                    key={booking.user}
                    className="flex flex-col cursor-pointer "
                  >
                    <div className="flex justify-between">
                      <span className="mr-1 underline">
                        &#9733; From{" "}
                        {format(new Date(booking.dates.start), "dd MMMM yyyy")}{" "}
                        to {format(new Date(booking.dates.end), "dd MMMM yyyy")}
                      </span>
                      <span className="ml-3 ">
                        By {user.name} ( {user.email} )
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div>No Bookings</div>
      )}
    </div>
  );
};

export default Booking;
