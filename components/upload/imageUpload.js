"use client";
import { useState, useRef } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Photocard from "./photocard";
import Loader from "@components/Loading";
import ButtonSubmit from "./button";
import { uploadPhoto } from "@actions/uploadActions";

const imageUpload = ({ location }) => {
  const formRef = useRef();
  const ImageRef = useRef(null);
  const [Loading, setLoading] = useState();
  const [files, setFiles] = useState([]);
  const [Result, setResult] = useState({
    success: "",
    error: "",
  });

  const handleinput = (e) => {
    const files = e.target.files;
    const newfiles = [...files].filter((item) =>
      item.type.startsWith("image/"),
    );
    setFiles((prev) => [...prev, ...newfiles]);
  };

  const handledelete = async (idx) => {
    const newfiles = files.filter((item, i) => i !== idx);
    setFiles(newfiles);
    URL.revokeObjectURL(files[idx]);
  };

  const handleupload = async ({ location }) => {
    if (files.length < 5)
      return setResult({ error: "At least 5 images are required !!" });
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const res = await uploadPhoto(formData, location);
    if (res) {
      setLoading(false);
      setResult({
        success:
          "Photos are successfully uploaded, you can move to next step now",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleupload({ location });
  };

  return (
    <>
      <form action={handleSubmit} ref={formRef} className="relative">
        <div className=" flex w-full ">
          <input
            type="file"
            accept="image/*"
            name="images"
            ref={ImageRef}
            className="hidden"
            multiple
            onChange={handleinput}
          />
          <div className="flex w-full right-0 justify-center top-0">
            <ButtonSubmit
              value={Loading ? <Loader /> : "Upload"}
              className=" cursor-pointer"
              uploader={handleSubmit}
            />
          </div>
        </div>
      </form>
      <div
        className={`relative cursor-pointer border-2 border-dashed ${files.length === 0 ? "p-20" : "p-10"
          } border-neutral-300 flex flex-col justify-center items-center mb-20 gap-4 text-neutral-600 rounded-lg mt-5`}
        onClick={() => ImageRef.current?.click()}
      >
        {files.length === 0 ? (
          <TbPhotoPlus size={35} />
        ) : (
          <div className="flex flex-wrap gap-5">
            {files.map((item, idx) => (
              <Photocard
                key={idx}
                url={URL.createObjectURL(item)}
                deleter={() => handledelete(idx)}
                edit={true}
              />
            ))}
          </div>
        )}
        {Result.success && (
          <span className="text-green-500">{Result.success}</span>
        )}
        {Result.error && <span className="text-red-500">{Result.error}</span>}
      </div>
    </>
  );
};

export default imageUpload;
