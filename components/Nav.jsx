"use client";
//prettier-ignore
import { BiUser, BiUserPlus, BiLogInCircle, BiHelpCircle, BiMessageRounded, } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import SearchBar from "./search.jsx";

const Nav = () => {
    const router = useRouter();
    const path = usePathname();
    const { data: session } = useSession();
    const [Dropdown, setDropdown] = useState(false);

    const handleClickBody = (event) => {
        if (Dropdown && !event.target.closest(".dropdown")) setDropdown(false);
    };

    useEffect(() => {
        document.addEventListener("click", handleClickBody);
        return () => document.removeEventListener("click", handleClickBody);
    }, [Dropdown]);

    return (
        <div className="flex justify-center">
            <div
                className={`${path == "/hall" || path == "/" ? "navbar" : "dashbar"}`}
            >
                <div className="p-2 text-2xl font-semibold caret-transparent">
                    <Link href="/" className="havns text-2xl">
                        Havns
                    </Link>
                </div>

                {(path == "/hall" || path == "/") && (
                    <div className="relative search_box rounded-full  ">
                        <SearchBar />
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {(path == "/hall" || path == "/") &&
                        (session?.user && session.user.role == "host" ? (

                            <Link href={"/dashboard/booking"}>
                                <div className="text-md font-medium rounded-full p-3 flex justify-center items-center gap-[0.5rem] hover:bg-gray-100 ease-out duration-300 max-[426px]:p-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Host Mode
                                </div>
                            </Link>

                        ) : (
                            <Link href="/protected/become-host">
                                <button className="text-md font-medium host rounded-full p-3 border border-gray-300 hover:bg-gray-100 ease-out duration-300 max-[426px]:p-2">
                                    Become a host
                                    <span>Now</span>
                                </button>
                            </Link>

                        ))}
                    <button
                        className={`border border-gray-300 rounded-full overflow-hidden w-[2.8rem] h-[2.8rem] ${session?.user ? "p-0" : "p-[0.8rem]"
                            } user ease-out duration-300 max-[426px]:p-0`}
                        onClick={() => setDropdown((d) => !d)}
                    >

                        <span className="flex w-[2.8rem] h-[2.8rem]">
                            {session?.user ? (
                                session?.user.image ? (

                                    <img
                                        src={session?.user.image}
                                        alt="A"
                                        className="rounded-full object-cover"
                                    />

                                ) : (

                                    <span className="text-white bg-[#ef4444] text-xl font-medium w-[2.8rem] h-[2.8rem] flex items-center justify-center rounded-full caret-transparent profile">
                                        {session.user.email.toUpperCase().toString()[0]}
                                    </span>

                                )
                            ) : (

                                <BiUser />
                            )}
                        </span>
                    </button>
                </div>
                <AnimatePresence>
                    {Dropdown && (
                        <motion.div
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="dropdown -z-50 flex flex-col text-base bg-white absolute top-20 right-2 py-2 rounded-xl "
                        >
                            {session?.user ? (
                                <>
                                    <Dropdownitem
                                        icon={<BiUser />}
                                        onClick={() => {
                                            router.push("/protected/controlpanel/booked");
                                            setDropdown(false);
                                        }}
                                        option="Control Panel"
                                    />
                                    <Dropdownitem
                                        icon={<AiOutlineHeart />}
                                        onClick={() => {
                                            router.push("/protected/wishlist");
                                            setDropdown(false);
                                        }}
                                        option="Wishlists"
                                    />
                                    <Dropdownitem
                                        icon={<IoMdLogOut />}
                                        onClick={signOut}
                                        option="Logout"
                                    />
                                </>
                            ) : (
                                <>
                                    <Dropdownitem
                                        icon={<BiLogInCircle />}
                                        onClick={() => {
                                            router.push("/signin");
                                            setDropdown(false);
                                        }}
                                        option="Log in"
                                        style="font-semibold"
                                    />
                                    <Dropdownitem
                                        icon={<BiUserPlus />}
                                        onClick={() => {
                                            router.push("/signup");
                                            setDropdown(false);
                                        }}
                                        option="Sign Up"
                                    />
                                    <Dropdownitem
                                        icon={<BiHelpCircle />}
                                        onClick={() => {
                                            router.push("/help");
                                            setDropdown(false);
                                        }}
                                        option="Help"
                                    />
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Dropdownitem = (props) => {
    return (
        <button
            className="flex items-center gap-4 p-2 pr-20 hover:bg-gray-50"
            onClick={props.onClick}
        >
            <span className="text-lg">{props.icon}</span>
            <span className={props.style}>{props.option}</span>
        </button>
    );
};

export default Nav;
