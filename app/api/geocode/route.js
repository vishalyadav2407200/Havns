export const GET = async (req, res) => {
  try {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");
    const res = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${process.env.GEOCODE_API}`,
    );
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response({ msg: error }, { status: 500 });
  }
};
