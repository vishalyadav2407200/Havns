"use client";
import Layout from "../../layout";
import Footer from "../../footer";
import Rates from "./rates";
import locationContext from "@context/locateContext";
import { updatePrice } from "@actions/createActions";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { motion } from "framer-motion";

const page = () => {
  const [Loading, setLoading] = useState();
  const pathname = usePathname();
  const locationID = pathname.substring(23,47)

  const [Data, setData] = useState({
    Veg: null,
    Nonveg: null,
    Decor: null,
    Room: null,
  });

  const { Address } = useContext(locationContext);
  const router = useRouter();

  const handleprices = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await updatePrice({ Data, locationID });
    if (res) {
      setLoading(false);
      router.push(`/protected/become-host/${locationID}/allset`);
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
          Mastering Prices, Unleashing Potential.
        </h1>
        <p className="text-gray-600">
          Set your prices here,You can change it anytime.
        </p>
        <div className="mt-6 ">
          <Rates Data={Data} setData={setData} />
        </div>
      </motion.div>
      <div className=" w-screen bottom-0 fixed">
        <Footer
          back="/protected/become-host/photos"
          next="/protected/become-host/allset"
          value={Loading ? "Working..." : "Next"}
          handle={handleprices}
        />
      </div>
    </Layout>
  );
};

export default page;
