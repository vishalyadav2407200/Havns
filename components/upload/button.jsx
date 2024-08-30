"use client";
import { useFormStatus } from "react-dom";

const Button = ({ value, uploader }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      onClick={uploader}
      className="bg-red-500 text-white px-5 py-3 active:scale-95 duration-100 ease-in rounded-lg font-medium "
    >
      {pending ? "Uploading...." : value}
    </button>
  );
};

export default Button;
