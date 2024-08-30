import { useEffect, useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { uploadPhoto } from "@actions/uploadActions";
import PhotoCard from "@components/upload/photocard";

const photoUpdater = ({
  id,
  deleteButton,
  ImageValue,
  setImageValue,
  deleteImage,
  setDeleteImage,
}) => {
  const ImageRef = useRef(null);
  const router = useRouter();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/hall/photos/${id}`, {
        method: "GET",
      });
      if (res.status == 200) {
        const result = await res.json();
        setData(result);
      } else {
        router.push(`/errors?error=${"No hall exist with that ID"}`);
      }
    };
    fetcher();
  }, []);

  //adding up uploaded images for input
  const handleImageChange = async (event) => {
    const files = event.target.files;
    setImageValue((prev) => [...prev, ...files]);
    //setImageValue(files) is wrong
  };

  //delete the images that are already in hall
  const handleDeleteData = async (i) => {
    setDeleteImage((prev) => [...prev, data[i].public_id]);
    const newImages = data.filter((item, idx) => i !== idx);
    setData(newImages);
  };

  //delete the new images that you are uploading from <input/>
  const handleDeleteInput = async (i) => {
    const newImages = ImageValue.filter((item, idx) => i !== idx);
    setImageValue(newImages);
    URL.revokeObjectURL(ImageValue[i]);
  };

  return (
    <div className="flex justify-center items-center">
      <input
        multiple
        type="file"
        className="hidden"
        accept="image/*"
        ref={ImageRef}
        onChange={handleImageChange}
      />
      <div className="flex flex-wrap gap-3">
        {data.map((item, i) => {
          return (
            //relative in photocard is doing its magic
            <PhotoCard
              key={i}
              url={item.secure_url}
              deleter={() => handleDeleteData(i)}
              edit={deleteButton}
            />
          );
        })}
        {ImageValue.map((item, i) => {
          return (
            <PhotoCard
              key={i}
              url={URL.createObjectURL(item)}
              deleter={() => handleDeleteInput(i)}
              edit={deleteButton}
            />
          );
        })}
        {deleteButton && (
          <button
            className="flex rounded-xl w-[250px] h-[250px] bg-slate-50 border-2 cursor-pointer border-slate-200 justify-center items-center"
            onClick={() => ImageRef.current.click()}
          >
            <HiOutlinePlus size={60} className="text-slate-200" />
          </button>
        )}
      </div>
    </div>
  );
};

export default photoUpdater;
