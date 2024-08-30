import connectToDB from "@utils/database";
import Hall from "@models/hall";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const result = await Hall.findOne({ _id: params.id });
    const obj = {
      id: result._id,
      title: result.title,
      location: result.location,
      halls: result.halls,
      seating: result.seating,
      maxcapacity: result.maxcapacity,
      lawns: result.lawns,
    };
    return new Response(JSON.stringify(obj), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
