"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const path = usePathname();
  const [active, setActive] = useState(path.slice(11));
  return (
    <div className="flex flex-col mt-7 items-center">
      <div className="text-left w-2/3 text-4xl font-medium">Dashboard</div>
      <div className="flex gap-5 justify-center mt-4 text-lg">
        <Link
          className={`border-2 rounded-md p-1 px-7 font-medium border-gray-200 ${active == "booking" && "bg-black text-white"}`}
          href="/dashboard/booking"
          onClick={() => setActive("booking")}
        >
          Bookings
        </Link>
        <Link
          className={`border-2 rounded-md p-1 px-7 font-medium border-gray-200 ${active.includes("halls") && "bg-black text-white"}`}
          href="/dashboard/halls"
          onClick={() => setActive("halls")}
        >
          Halls
        </Link>
        <Link
          className={`border-2 rounded-md p-1 px-7 font-medium border-gray-200 ${active == "listing" && "bg-black text-white"}`}
          href="/dashboard/listing"
          onClick={() => setActive("listing")}
        >
          Listings
        </Link>
      </div>
      <div className="text-left w-2/3 rounded-lg p-3 bg-gray-50 my-7 border relative border-gray-200">
        {children}
      </div>
    </div>
  );
};

export default Layout;
