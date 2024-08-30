import connectToDB from "@utils/database";
import Photo from "@models/photos";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const photos = await Photo.findOne({ location: params.address });
    return new Response(JSON.stringify(photos), { status: 200 });
  } catch (error) {
    return new Response({ msg: error });
  }
};
