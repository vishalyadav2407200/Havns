"use client";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { eachDayOfInterval } from "date-fns";
import { useState } from "react";

const Calender = ({ handler, disable }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Function to generate an array of dates within a range
  const generateDatesArray = (startDate, endDate) => {
    return eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
  };

  // Function to determine if a date is disabled
  const isDateDisabled = () => {
    const dates = disable.flatMap((disabledRange) => {
      const { start, end } = disabledRange.dates;
      return generateDatesArray(start, end);
    });
    return dates;
  };

  const handleDateChange = (item) => {
    setState([item.selection]);
    handler(item.selection.startDate, item.selection.endDate);
    setIsCalendarOpen(false);
  };

  const disabledDates = isDateDisabled();

  return (
    <div className="w-full relative flex justify-evenly">
      <div
        className="border-y p-2 w-full my-7 flex cursor-pointer"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <span className="w-full text-md flex justify-evenly ">
          <span >
            <span className="text-gray-400">From  -  </span>
            {`${state[0].startDate.toLocaleDateString('en-GB')}`}
          </span>
          <span>
            <span className="text-gray-400">To  -  </span>
            {`${state[0].endDate.toLocaleDateString('en-GB')}`}
          </span>
        </span>
      </div>

      {
        isCalendarOpen && (
          <div className="absolute border-2 z-10">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleDateChange(item)}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              ranges={state}
              direction="vertical"
              disabledDates={disabledDates}
            />
          </div>
        )
      }
    </div >
  );
};

export default Calender;

