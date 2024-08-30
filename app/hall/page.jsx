"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PiMapPinBold } from "react-icons/pi";
import Images from "@components/Images";
import { getData } from "./data";
import Description from "./description";
import Reviews from "@components/reviews/AllReviews";
import Loader from "@components/Loading";
import Footer from "./footer";
import Viewer from "@app/hall/imgView";

const Map = dynamic(() => import("@components/map/map"), {
    loading: () => <Loader />,
    ssr: false,
});

const Page = () => {
    const [data, setData] = useState({});
    const searchParams = useSearchParams();
    const [view, setView] = useState(null);

    const locationId = searchParams.get("id");

    useEffect(() => {
        const fetcher = async () => {
            const temp = await getData(locationId);
            setData(temp);
        };
        fetcher();
    }, [locationId]);

    return (
        <div className="flex flex-col min-h-screen">
            {!view ? (
                <div className="flex flex-col flex-grow items-center mt-8">
                    <div className="w-full max-w-[1550px] px-4">
                        {data && data.location && data.title ? (
                            <>
                                <section className="my-5">
                                    <div className="flex items-center gap-2 text-xl font-bold">
                                        <PiMapPinBold />
                                        {data.location}
                                    </div>
                                    <h2 className="underline">{data.title}</h2>
                                </section>
                                <section>
                                    {data.photos && (
                                        <Images value={data.photos} setView={setView} />
                                    )}
                                </section>
                                <section>
                                    <Description info={data} />
                                </section>
                                <section>
                                    {data.location && <Map location={data.location} />}
                                </section>
                                <section>
                                    <Reviews Id={data._id} />
                                </section>
                            </>
                        ) : (
                            <div className="justify-center items-center mt-8">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Viewer value={data.photos} setView={setView} />
            )}
            <Footer className="mt-auto" />
        </div>
    );
};

export default Page;

