import React from "react";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";

const reviewBox = ({ name, stars, image, feedback, date }) => {
  return (
    <div className="rounded-xl ">
      <div className="flex p-2 gap-4 ">
        <div>
          <div className="bg-black text-white text-xl font-semibold rounded-full flex items-center justify-center h-12 w-12">
            {image ? (
              <img src={image} alt="A" className="rounded-full" />
            ) : (
              name.slice(0, 1)
            )}
          </div>
        </div>

        <div>
          <div>
            <div className="font-medium text-base">{name}</div>
            <div className="font-light text-sm">
              {format(new Date(date), "MMMM yyyy")}
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                return (
                  <FaStar size={13} color={i < stars ? "#ffd700" : "#a6a6a6"} />
                );
              })}
            </div>
          </div>
          <div className="text-base text-gray-500 flex gap-1">{feedback}</div>
        </div>
      </div>
    </div>
  );
};

export default reviewBox;
