"use client";
import ImageBox from "./ImageBox";
import { useEffect, useState } from "react";
import { dynamicBlurDataUrl } from "@utils/dynamicBlurData";
import Link from "next/link";
import { TbHeart } from "react-icons/tb";
import { TbHeartFilled } from "react-icons/tb";
import { hallLiker, hallDisliker } from "@actions/userActions";
import { useRouter } from "next/navigation";

const Hallcard = ({
  title,
  photo,
  location,
  capacity,
  price,
  id,
  isLiked,
  session,
}) => {
  const [placer, setPlacer] = useState("");
  const [like, setLike] = useState(isLiked);
  const router = useRouter();

  const blur = async (photo) => {
    try {
      const blurred = await dynamicBlurDataUrl(photo);
      setPlacer(blurred);
    } catch (error) {
      console.error('Error blurring image:', error);
      setPlacer('');
    }
  };

  useEffect(() => {
    blur(photo);
  }, [photo]);

  const handleClick = async () => {
    if (session) {
      const prevState = like;
      setLike((prev) => !prev);
      if (prevState) {
        await hallDisliker(id);
      } else {
        await hallLiker(id);
      }
    } else {
      router.push("/signin");
    }
  };

  return (
    placer.length > 0 && (<div className="border rounded-xl h-[22rem] hallcard duration-300 ease-out">
      <div className="overflow-hidden flex relative items-center rounded-t-xl h-1/2">
        <ImageBox link={photo} placeholder={placer} feed={true} />
        {like ? (
          <TbHeartFilled
            className="absolute top-1 right-1"
            size={23}
            color="red"
            onClick={() => handleClick()}
          />
        ) : (
          <TbHeart
            className="absolute top-1 right-1"
            size={23}
            color="white"
            onClick={() => handleClick()}
          />
        )}
      </div>
      <Link href={`/hall?id=${id}`}>
        <div className="relative h-1/2 w-[300px] p-3">
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-gray-600 text-sm">{location}</div>
          <span className="text-gray-600 text-sm">Up to {capacity} People</span>
          <div className="absolute bottom-0 pb-3 flex text-sm justify-between">
            <span>₹ {price} per vegetarian plate.</span>
          </div>
        </div>
      </Link>
    </div>)
  );
};

export default Hallcard;
