import connectToDB from "@utils/database";
import Hall from "@models/hall";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const query = req.nextUrl.searchParams.get("q");
    if (query != null && query != "") {
      const res = await Hall.find({
        $and: [
          { done: true },
          {
            $text: {
              $search: `${query}`,
              $caseSensitive: false,
              $diacriticSensitive: true,
            },
          },
        ],
      });
      return new Response(JSON.stringify(res), { status: 200 });
    }
    const res = await Hall.find({ done: true });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response({ msg: error }, { status: 500 });
  }
};
