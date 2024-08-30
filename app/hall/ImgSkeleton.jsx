import React from "react";

const ImgSkeleton = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 grid-flow-col gap-2 h-96 w-[79vw]">
      <div className="col-span-2 row-span-2 relative bg-slate-100 rounded-l-2xl"></div>
      <div className="relative bg-slate-100"></div>
      <div className="relative bg-slate-100"></div>
      <div className="relative bg-slate-100 rounded-tr-2xl"></div>
      <div className="relative bg-slate-100 rounded-br-2xl"></div>
    </div>
  );
};

export default ImgSkeleton;
