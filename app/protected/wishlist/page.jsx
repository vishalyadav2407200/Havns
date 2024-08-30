"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
    const { data: session } = useSession();
    const [halls, setHalls] = useState([]);

    useEffect(() => {
        const fetcher = async () => {
            if (session) {
                const res = await fetch(`/api/wishlist/${session?.user._id}`);
                const userData = await res.json();

                const hallPromise = userData.liked.map(async (id) => {
                    const response = await fetch(`/api/wishlist/hall/${id}`);
                    return response.json();
                });
                const hallData = await Promise.all(hallPromise);
                console.log(hallData)
                setHalls(hallData);
            }
        };

        fetcher();
    }, [session]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {halls.map((hall, i) => (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <Link key={i} href={`/hall?id=${hall.id}`} >
                            <h2 className="text-xl font-semibold mb-2">{hall.title}</h2>
                            <p className="text-gray-700 mb-1">
                                <strong>Location:</strong> {hall.location}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Halls:</strong> {hall.halls}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Seating:</strong> {hall.seating}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Max Capacity:</strong> {hall.maxcapacity}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Lawns:</strong> {hall.lawns}
                            </p>
                        </Link >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;

