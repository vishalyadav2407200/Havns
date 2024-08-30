import  Link  from "next/link";

const footer = ({back, next,handle,value}) => {
  return (
    <div className=" flex justify-between text-xl p-10">
      <Link href={back}>
        <button className="bg-black rounded-lg text-white font-medium py-2 px-6">
          Back
        </button>
      </Link>
      <Link href={next}>
        <button
          onClick={handle}
          className="bg-black rounded-lg text-white font-medium py-2 px-6"
        >
          {value}
        </button>
      </Link>
    </div>
  );
};

export default footer;
