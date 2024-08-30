"use client";
import HallCard from "./Hallcard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "./Loading";
import { useSearchParams } from "next/navigation";
import { getFeed } from "./getFeed";

const Feed = () => {
  const [Halls, setHalls] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const path = useSearchParams();
  const search = path.get("q");

  useEffect(() => {
    const fetcher = async () => {
      // let hallsDataFromStorage = sessionStorage.getItem("hallsData");
      // if (hallsDataFromStorage && search == null) {
      //   setHalls(JSON.parse(hallsDataFromStorage));
      //   setLoading(false);
      // } else {
      const res = await getFeed(search);
      setHalls(res);
      setLoading(false);
      //   if (search == null)
      //     sessionStorage.setItem("hallsData", JSON.stringify(res));
      // }
    };
    fetcher();
  }, [search]);

  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="font-semibold text-2xl mt-10 ml-32">
            {search &&
              `Search Results for ${search.slice(0, 1).toUpperCase().concat(search.slice(1))}`}
          </div>
          <div className="flex justify-center items-center gap-8 p-10 flex-wrap">
            {Halls?.map((item, i) => {
              return (
                <HallCard
                  key={i}
                  id={item._id}
                  photo={item.photos.secure_url}
                  title={item.title}
                  location={item.location}
                  capacity={item.maxcapacity}
                  price={item.veg}
                  isLiked={item.isLiked}
                  session={session?.user._id ? true : false}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
