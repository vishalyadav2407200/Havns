"use client";
import locationContext from "@context/locateContext";
import Footer from "../../footer";
import Counts from "./counts";
import Layout from "../../layout";
import useCountsState from "@hooks/useCountsState";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { updateCapacity } from "@actions/createActions";
import { usePathname } from "next/navigation";

const page = () => {
  const { Address } = useContext(locationContext);
  const [Loading, setLoading] = useState();
  const router = useRouter();
  const pathname = usePathname();

  const {
    Halls,
    setHalls,
    Lawns,
    setLawns,
    Maxcapacity,
    setMaxcapacity,
    Seating,
    setSeating,
  } = useCountsState();

  const data = [
    {
      name: "Halls",
      state: Halls,
      setState: setHalls,
    },
    {
      name: "Seating",
      state: Seating,
      setState: setSeating,
    },
    {
      name: "Max Capacity",
      state: Maxcapacity,
      setState: setMaxcapacity,
    },
    {
      name: "Lawns",
      state: Lawns,
      setState: setLawns,
    },
  ];

  const postabout = async (e) => {
    setLoading(true);
    let locationID = pathname.substring(23, 47);

    e.preventDefault();
    try {
      const res = await updateCapacity({
        ID: locationID,
        halls: Halls.num,
        seating: Seating.num,
        maxcapacity: Maxcapacity.num,
        lawns: Lawns.num,
      });
      if (res.msg == "success") {
        setLoading(false);
        router.push(`/protected/become-host/${locationID}/photos`);
      }
    } catch (e) {
      console.log(e);
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
        <h1 className="text-4xl font-semibold">
          Share some basics about your place
        </h1>
        <p className="text-gray-600">You'll add more details later !!</p>
        {data.map((item, i) => {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <Counts
                name={item.name}
                Value={item.state}
                setValue={item.setState}
              />
            </motion.div>
          );
        })}
      </motion.div>
      <div className=" fixed w-screen bottom-0 ">
        <Footer
          back={`/protected/become-host/${pathname.substring(23, 47)}/places`}
          next=""
          value={Loading ? "Working..." : "Next"}
          handle={postabout}
        />
      </div>
    </Layout>
  );
};

export default page;
