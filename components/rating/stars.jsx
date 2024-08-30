import { useState } from "react";
import { FaStar } from "react-icons/fa";

const stars = ({ onRatingChange }) => {
  const stars = Array(5).fill(0);
  const [Current, setCurrent] = useState(0);
  const [Hover, setHover] = useState(0);

  const handleClick = (value) => {
    setCurrent(value);
    onRatingChange(value);
  };

  const handleMouseOver = (value) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className="flex gap-0.5 text-3xl cursor-pointer">
      {stars.map((_, i) => {
        return (
          <FaStar
            key={i}
            color={(Hover || Current) > i ? "#FFA959" : "#a9a9a9"}
            onClick={() => handleClick(i + 1)}
            onMouseOver={() => handleMouseOver(i + 1)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default stars;
