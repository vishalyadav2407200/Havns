import { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const counts = ({ name, Value, setValue }) => {
  const [Count, setCount] = useState(0);
  const dec = () => {
    if (Count > 0) {
      if (name == "Seating" || name == "Max Capacity") {
        setValue({ ...Value, num: Value.num - 150 });
        setCount(Count - 150);
      } else {
        setValue({ ...Value, num: Value.num - 1 });
        setCount(Count - 1);
      }
    }
  };
  const inc = () => {
    if (Count < 9900) {
      if (name == "Seating" || name == "Max Capacity") {
        setValue({ ...Value, num: Value.num + 150 });
        setCount(Count + 150);
      } else {
        setValue({ ...Value, num: Value.num + 1 });
        setCount(Count + 1);
      }
    }
  };
  return (
    <div className="flex w-full justify-between text-xl border-b-2 pb-3 mt-8">
      <div>{name}</div>
      <div className="flex w-[20%] justify-between">
        <button onClick={dec} className="text-2xl">
          <CiCircleMinus />
        </button>
        {Count}
        <button onClick={inc} className="text-2xl">
          <CiCirclePlus />
        </button>
      </div>
    </div>
  );
};

export default counts;
