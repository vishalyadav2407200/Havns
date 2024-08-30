"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Wrapper from "@components/Wrapper";
import locationContext from "@context/locateContext";
import { GiCrystalGrowth } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaHandshake } from "react-icons/lia";
import { GiCheckMark } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";

const page = () => {
  const data = [
    {
      head: "Grow Business",
      sechead: "Get more cost-effective business opportunities digitally",
      icon: <GiCrystalGrowth />,
    },
    {
      head: "New Customers",
      sechead: "Acquire New Customers who are looking for your kind of Venue",
      icon: <AiOutlineUsergroupAdd />,
    },
    {
      head: "Engage Customers",
      sechead: "Engage prospective customers effectively for more Bookings",
      icon: <LiaHandshake />,
    },
    {
      head: "Marketing & Branding",
      sechead:
        "Be where your customers are searching for you for the best ROI.",
      icon: <GiCheckMark />,
    },
    {
      head: "Communicate",
      sechead:
        "Listen & give best-suited proposals. Get genuine reviews from your customers.",
      icon: <BsHeadset />,
    },
  ];

  const { Address, setAddress } = useContext(locationContext);
  const router = useRouter();

  const creator = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/hall/create", {
        method: "POST",
      });
      const data = await res.json();
      let locID = data._id;
      if (locID) {
        setAddress({ ...Address, locID: locID });
        router.push(`/protected/become-host/${locID}/places`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-32">
      <div className="flex justify-center items-center mt-4">
        <Wrapper>
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-6xl font-bold inline-block align-middle ">
              What will you receive by partnering with us?
            </span>
          </motion.div>
        </Wrapper>
        <div className="flex flex-col justify-center gap-12">
          {data.map((item, i) => {
            return (
              <motion.div
                key={item.head}
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <List
                  head={item.head}
                  sechead={item.sechead}
                  icon={item.icon}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href={``}>
          <button
            className="bg-black hover:bg-white hover:text-black border-2 border-white duration-300 hover:border-black text-white font-bold py-3 px-6 mt-10 rounded-full "
            onClick={creator}
          >
            Get Started
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

const List = ({ head, sechead, icon }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-4xl">{icon}</span>
      <div>
        <h2 className="text-xl font-bold">{head}</h2>
        <p>{sechead}</p>
      </div>
    </div>
  );
};

export default page;
