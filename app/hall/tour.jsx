"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tour = ({ host , hall }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = dateRef.current.value;
    const time = timeRef.current.value;
    console.log(typeof(time))
    await fetch("/api/meeting/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time, host, hall }),
    });
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between rounded-xl p-4 bg-black virtual_box items-center align-middle">
        <span className="text-white text-[1.15rem]">
          Get a Real-time Glimpse of the Wedding Venue
        </span>
        <button
          role="button"
          className="duration-200 virtual active:scale-[95%]"
          onClick={() => setShowDetails(true)}
        >
          <span className="font-medium">Check Out</span>
        </button>
      </div>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -60 }}
            className="border-2 rounded-xl  p-4"
          >
            <form onSubmit={handleSubmit} className="flex justify-between ">
              <div className="flex gap-5">
                <input type="date" ref={dateRef} />
                <input type="time" ref={timeRef} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tour;
