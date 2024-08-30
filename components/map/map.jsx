"use client";
import { useEffect, useState } from "react";
import "@styles/leaflet.css"
import getMap from "./leaflet";

export default function Map({ location }) {
  const [Cord, setCord] = useState({ lat: 0.0, lng: 0.0 });

  useEffect(() => {
    const fetcher = async () => {
      await coordinates();
    };
    fetcher();
  }, []);

  useEffect(() => {
    getMap(Cord);
  }, [Cord]);
  const key = "a4ad05967c45c6052bb03466a45907a6";

  const coordinates = async () => {
    const url = `https://api.positionstack.com/v1/forward?access_key=${key}&query=${location}`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setCord({
        lat: result.data[0].latitude,
        lng: result.data[0].longitude,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <div id="map" className="h-[63vh] rounded-2xl" ></div>;
}
