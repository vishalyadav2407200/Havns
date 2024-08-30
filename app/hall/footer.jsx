import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitter,
} from "react-icons/bi";

const footer = () => {
  return (
    <div className="flex justify-center items-center text-sm gap-7 my-10">
      <span>© 2023 Havns, Inc.</span>
      |
      <a href="#" className="font-light hover:underline">
        Privacy
      </a>
      |
      <a href="#" className="font-light hover:underline">
        Terms
      </a>
      |
      <a href="#" className="font-light hover:underline">
        Company Details
      </a>
      |
      <div className="text-lg gap-5 flex">
        <a href="#">
          <BiLogoFacebookCircle />
        </a>
        <a href="#">
          <BiLogoInstagramAlt />
        </a>
        <a href="#">
          <BiLogoTwitter />
        </a>
      </div>
    </div>
  );
};

export default footer;
