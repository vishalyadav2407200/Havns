import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

const photocard = ({ url, deleter, edit }) => {
  return (
    <div className="relative rounded-xl photocard p-3">
      <div style={{ width: "200px", height: "200px" }}>
        <Image
          src={url}
          alt="uploads"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      {edit && (
        <button
          type="button"
          onClick={deleter}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
        >
          <MdDeleteOutline size={18} />
        </button>
      )}
    </div>
  );
};

export default photocard;
