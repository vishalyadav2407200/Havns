"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function getFeed(search) {
  try {
    const session = await getServerSession(authOptions);
    var locationsData = null;
    if (search != null) {
      const locationsResponse = await fetch(
        `${process.env.CLIENT_URL}/api/hall/?q=${search}`,
      );
      locationsData = await locationsResponse.json();
    } else {
      const locationsResponse = await fetch(
        `${process.env.CLIENT_URL}/api/hall`,
      );
      locationsData = await locationsResponse.json();
    }

    const photosPromises = locationsData.map(async (location) => {
      const photoResponse = await fetch(
        `${process.env.CLIENT_URL}/api/photo/${location._id}`,
      );
      const photoData = await photoResponse.json();
      return photoData;
    });
    const photos = await Promise.all(photosPromises);

    var userData = {};
    if (session) {
      const userRes = await fetch(
        `${process.env.CLIENT_URL}/api/hosts/${session?.user._id}`,
      );
      userData = await userRes.json();
    }

    const hallsData = locationsData.map((location, index) => {
      return {
        ...location,
        photos: photos[index],
        isLiked: userData.liked?.includes(location._id),
      };
    });
    return hallsData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
