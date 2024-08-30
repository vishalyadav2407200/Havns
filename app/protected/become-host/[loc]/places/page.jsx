"use client";
import Footer from "../../footer";
import Layout from "../../layout";
import Locater from "./locater";
import locationContext from "@context/locateContext";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [Loading, setLoading] = useState();
  const { Address, setAddress } = useContext(locationContext);
  let locationID = pathname.substring(23, 47);

  const postlocation = async (e) => {
    setAddress({ loca: "", locID: locationID });
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/hall/new", {
        method: "POST",
        body: JSON.stringify({
          ID: locationID,
          location: Address.loca,
        }),
      });
      if (res.status == 200) {
        setLoading(false);
        router.push(`/protected/become-host/${locationID}/capacity`);
      }
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className=" flex flex-col gap-4"
      >
        <h1 className="text-4xl font-semibold">Where's your place located?</h1>
        <p className="text-gray-600">Tell us where your havns is located ?</p>
        <Locater Address={Address} setAddress={setAddress} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className=" fixed w-screen bottom-0 "
      >
        <Footer
          back="/protected/become-host"
          next=""
          handle={postlocation}
          value={Loading ? "Working..." : "Next"}
        />
      </motion.div>
    </Layout>
  );
};

export default page;
