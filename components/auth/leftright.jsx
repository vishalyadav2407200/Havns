"use client";
import { useState, useEffect } from "react";
import Form from "@components/auth/Form";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const leftright = ({ page, head, secHead }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`grid ${screenWidth < 640
        ? "justify-center items-center h-screen"
        : "grid-cols-2"
        } w-full mt-10 gap-16 loginbox h-[80vh]`}
    >

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -150 }}
          className="left"
        >
          <div className="flex flex-col items-end max-[650px]:items-center gap-14">
            <div
              className={`${page == "Log in" ? "mr-[4rem]" : "mr-[7rem]"
                } max-[900px]:mr-0`}
            >
              <p className="text-5xl font-bold leftup">{head}</p>
              <span className="text-sm text-gray-400">{secHead}</span>
            </div>
            <Form type={page} />
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 150 }}
          className={`right relative w-full max-w-md ${screenWidth < 640 ? "h-screen" : "min-h-full"
            }`}
        >
          <Image
            src="/images/right.jpg"
            fill
            priority
            style={{ objectFit: "cover" }}
            alt="sidephoto"
            className="rounded-2xl login_bg"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default leftright;
