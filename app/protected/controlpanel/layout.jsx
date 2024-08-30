"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const path = usePathname();
  const [active, setActive] = useState(path.slice(24));

  return (
    <div className="flex flex-col mt-7 items-center">
      <div className="text-left w-2/3 text-4xl font-medium">Control Panel</div>
      <div className="flex gap-5 justify-center mt-4 text-lg">
        <Link
          className={`border-2 rounded-md p-1 px-7 font-medium border-gray-200 ${active == "booked" && "bg-black text-white"}`}
          href="/protected/controlpanel/booked"
          onClick={() => setActive("booked")}
        >
          Reservations
        </Link>
        <Link
          className={`border-2 rounded-md p-1 px-7 font-medium border-gray-200 ${active.includes("meeting") && "bg-black text-white"}`}
          href="/protected/controlpanel/meeting"
          onClick={() => setActive("meeting")}
        >
          Virtual meetings
        </Link>
        <Link
          className={`border-2 rounded-md p-1 px-7 font-medium border-gray-200 ${active == "account" && "bg-black text-white"}`}
          href="/protected/controlpanel/account"
          onClick={() => setActive("account")}
        >
          Account Settings
        </Link>
      </div>
      <div className="text-left w-2/3 rounded-lg p-3 bg-gray-50 my-7 border relative border-gray-200">
        {children}
      </div>
    </div>
  );
};

export default Layout;
