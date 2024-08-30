"use client";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { IoClose } from "react-icons/io5";

const viewer = ({ setView, value }) => {
    const { scrollYProgress } = useScroll();
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 200 }}
                transition={{ duration: 0.4 }}
                className="py-6 relative w-screen bg-white"
            >
                <button className="absolute right-9" onClick={() => setView(false)}>
                    <IoClose size={35} />
                </button>
                <div className="flex flex-col items-center justify-between w-screen gap-3">
                    {value.map((item) => {
                        return (
                            <motion.img
                                initial={{ opacity: 0 }}
                                viewport={{ once: true, amount: 0.8 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-3/4 rounded-md"
                                src={item}
                            />
                        );
                    })}
                </div>{" "}
                <motion.div
                    className="z-40 absolute top-0"
                    style={{ scaleX: scrollYProgress }}
                ></motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default viewer;
