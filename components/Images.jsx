import { dynamicBlurDataUrl } from "@utils/dynamicBlurData";
import { BiSolidPlusCircle } from "react-icons/bi";
import ImageBox from "./ImageBox";
import { useEffect, useState } from "react";

const Images = ({ value, setView }) => {
    const [placer, setPlacer] = useState([]);

    useEffect(() => {
        const blur = async () => {
            const blurred = await Promise.all(value.map((url) => dynamicBlurDataUrl(url)));
            setPlacer(blurred);
        };
        blur();
    }, [value]);

    return (
        <div className="relative">
            <div className="hidden min-[800px]:grid min-[800px]:grid-cols-4 min-[800px]:grid-rows-2 min-[800px]:grid-flow-col min-[800px]:gap-2 h-96">
                <div className="col-span-2 row-span-2 relative">
                    <ImageBox
                        link={value[0]}
                        classes="rounded-tl-2xl rounded-bl-2xl"
                        placeholder={placer[0]}
                    />
                </div>
                <div className="relative">
                    <ImageBox link={value[1]} placeholder={placer[1]} />
                </div>
                <div className="relative">
                    <ImageBox link={value[2]} placeholder={placer[2]} />
                </div>
                <div className="relative">
                    <ImageBox
                        link={value[3]}
                        classes="rounded-tr-2xl"
                        placeholder={placer[3]}
                    />
                </div>
                <button
                    onClick={() => setView(true)}
                    className="relative w-full flex flex-col justify-center rounded-br-2xl items-center cursor-pointer overflow-hidden"
                >
                    <div className="absolute blur-lg z-[0] hover:blur-sm duration-300">
                        <ImageBox link={value[4]} classes="rounded-br-2xl" />
                    </div>
                    <button className="text-2xl z-[1] text-white pointer-events-none">
                        <BiSolidPlusCircle />
                    </button>
                    <span className="z-[1] text-white pointer-events-none">Show More</span>
                </button>
            </div>

            <div className="min-[800px]:hidden">
                <div className="relative">
                    <ImageBox link={value[0]} classes="rounded-xl" placeholder={placer[0]} />
                    <button
                        onClick={() => setView(true)}
                        className="absolute bottom-2 right-2 bg-black font-pops bg-white bg-opacity-20 text-white py-1 px-2 rounded"
                    >
                        Show More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Images;

