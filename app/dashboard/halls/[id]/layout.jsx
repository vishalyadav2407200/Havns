"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const id = pathname.substring(17, 41);

  const isEditorActive = pathname.includes(`editor`);
  const isMeetingReqActive = pathname.includes(`meetingreq`);

  return (
    <div>
      <div className="flex flex-1 justify-around items-center gap-5 border border-black rounded-md">
        <Link
          href={`/dashboard/halls/${id}/editor`}
          className={`w-full flex justify-center border-r border-black py-2 ${isEditorActive ? "font-semibold underline" : ""}`}
        >
          Editor
        </Link>
        <Link
          href={`/dashboard/halls/${id}/meetingreq`}
          className={`w-full flex justify-center py-2 ${isMeetingReqActive ? "font-semibold underline" : ""}`}
        >
          Virtual Meeting Requests
        </Link>
      </div>
      <div className="mt-7">{children}</div>
    </div>
  );
};

export default Layout;
