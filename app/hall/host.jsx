import { useEffect, useState } from "react";
import formatDistance from "date-fns/formatDistance";
import { getHost } from "./hostData";

const host = async (data) => {
    const [Info, setInfo] = useState({});
    useEffect(() => {
        const fetcher = async () => {
            const temp = await getHost(data);
            setInfo(temp);
        };
        fetcher();
    }, []);

    let date =
        Info?.createdAt && formatDistance(new Date(Info?.createdAt), new Date());

    return (
        <div className="border-2 rounded-xl ">
            <div className="flex p-2 gap-4 ">
                <div className="rounded-full">
                    <div className="bg-black text-white text-xl font-semibold items-center p-4 align-middle flex justify-center rounded-xl">
                        {(Info?.name || "").toUpperCase().charAt(0)}
                    </div>
                </div>
                <div>
                    <div className="font-medium text-lg">
                        Hosted by{" "}
                        {Info?.name &&
                            (Info?.name).toUpperCase().charAt(0) + (Info?.name).slice(1)}
                    </div>
                    <div className="text-base text-gray-500 flex gap-1">
                        {Info?.email} &#183;
                        {" "}
                        {date && date.toUpperCase().charAt(0) + date.slice(1)} of hosting
                    </div>
                </div>
            </div>
        </div>
    );
};

export default host;
