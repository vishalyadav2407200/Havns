"use client";
import { differenceInDays } from 'date-fns'
import Calender from "./datepicker";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const prices = ({ rates }) => {
    const router = useRouter();
    const [isReserving, setIsReserving] = useState(false);
    const [stars, setStars] = useState({
        stars: 0,
        total: 0,
    });
    const [dates, setDates] = useState({
        start: new Date(),
        end: new Date(),
    });

    const stripePromise = loadStripe(
        "pk_test_51OhAl8SC96GcZqfUXc4paoG4kzaU7mcQyP8lbNuN0GXxNCkmNmQH9Fa965ot9J9BfWsiK6XEt4RJT2wbBIPvdbom00SAhbKph6",
    );

    useEffect(() => {
        const fetcher = async () => {
            const res = await fetch(`/api/review/${rates._id}/?total=true`);
            const result = await res.json();
            setStars({
                stars: result.stars,
                total: result.total,
            });
        };
        fetcher();
    }, [rates]);

    const changer = (start, end) => {
        setDates({ start, end });
    };

    const booker = async () => {
        try {
            setIsReserving(true);
            const numberOfDays = differenceInDays(dates.end, dates.start) + 1; // +1 to include the start date

            const totalAmount = numberOfDays * (rates.decor + rates.veg + rates.nonveg + rates.room);

            const res1 = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    title: rates.title,
                    amount: totalAmount,
                    Id: rates._id,
                    dates: dates,
                }),
            });
            const result = await res1.json();
            router.push(result.url);
        } catch (error) {
            console.error("Error during reservation:", error);
            alert("An unexpected error occurred.");
        } finally {
            setIsReserving(false);
        }
    };

    return (
        <div className="rounded-2xl booker border-2 flex flex-col gap-2 ">
            <div className="flex gap-4 items-baseline m-2 mx-4">
                <div>
                    <span className="font-bold text-2xl">
                        {stars.stars ? stars.stars : 0}
                    </span>
                    <span> &#9733;</span>
                </div>
                <span className="text-slate-500 text-sm ">
                    {stars.total}&#183;Reviews
                </span>
            </div>
            <div className="flex flex-col gap-1 mx-5">
                <div className=" flex justify-between ">
                    <span className="underline">Vegetarian Plate</span>
                    <span className="w-[30%]">
                        ₹ {rates.veg ? rates.veg.toLocaleString("en-IN") : "-----"}
                    </span>
                </div>
                <div className=" flex justify-between ">
                    <span className="underline">Non-Vegetarian Plate</span>
                    <span className="w-[30%]">
                        ₹ {rates.nonveg ? rates.nonveg.toLocaleString("en-IN") : "-----"}
                    </span>
                </div>
                <div className=" flex justify-between ">
                    <span className="underline">Rooms</span>
                    <span className="w-[30%]">
                        ₹ {rates.room ? rates.room.toLocaleString("en-IN") : "-----"}
                    </span>
                </div>
                <div className=" flex justify-between ">
                    <span className="underline">Extra Decoration</span>
                    <span className="w-[30%]">
                        ₹ {rates.decor ? rates.decor.toLocaleString("en-IN") : "-----"}
                    </span>
                </div>
                <div className=" flex justify-between ">
                    <span className="underline">10% Service fees</span>
                    <span className="w-[30%]">
                        ₹{" "}
                        {rates.decor
                            ? (
                                (rates.decor + rates.veg + rates.nonveg + rates.room) *
                                0.1
                            ).toFixed(2)
                            : "-----"}
                    </span>
                </div>
            </div>
            <div className="flex w-full items-center ">
                <Calender handler={changer} disable={rates.booked} />
            </div>
            <span className=" bg-[#ef4444] text-lg p-[0.42rem] text-white font-medium rounded-b-xl">
                <button
                    disabled={isReserving}
                    className="active:text-base w-full duration-150"
                    onClick={() => booker()}
                >
                    {isReserving ? "Reserving..." : "Reserve Now"}
                </button>
            </span>
        </div>
    );
};

export default prices;
