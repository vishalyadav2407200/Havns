import { useRef, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { uploadToCloudinary, savePhotoToLocal } from "@actions/uploadActions";
import { updateUser } from "@actions/userActions";

const ProfileCard = ({ user }) => {
  const [ImageValue, setImageValue] = useState(user?.image);
  const [FormImage, setFormImage] = useState(null);
  const ImageRef = useRef(null);

  const [Name, setName] = useState(user?.name);
  const [Email, setEmail] = useState(user?.email);

  const [Edit, setEdit] = useState(false);
  const [Submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      var link = [];
      if (FormImage) {
        const formdata = new FormData();
        formdata.append("files", FormImage);
        const newfile = await savePhotoToLocal(formdata);
        link = await uploadToCloudinary(newfile);
      }
      await updateUser(Name, Email, link[0]?.secure_url);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setEdit(false);
    }
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      setFormImage(file);
      setImageValue(URL.createObjectURL(file));
    } else {
      console.log("only image are allowed");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {ImageValue ? (
          <div className="w-[9.8rem] h-[9.8rem] flex">
            <img
              src={ImageValue}
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div>
            <span className="text-white bg-[#ef4444] text-xl font-medium w-[3.8rem] h-[3.8rem] flex items-center justify-center rounded-full caret-transparent profile hover:brightness-75 transition-all">
              {user?.email.toUpperCase().toString()[0]}
            </span>
          </div>
        )}
        <span>
          <input
            type="file"
            ref={ImageRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {Edit && (
            <button className="p-2">
              <TbEdit size={20} onClick={() => ImageRef.current?.click()} />
            </button>
          )}
        </span>
      </div>

      <div className="flex justify-center my-5  items-center">
        <div className="flex flex-col w-2/3 gap-3">
          <div className="flex">
            <span className="w-1/2">Name : </span>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className={`rounded-md px-2 w-1/2 bg-gray-50 ${Edit && "border-2 py-1 border-black"}`}
              disabled={!Edit}
            />
          </div>
          <div className="flex">
            <span className="w-1/2">Email : </span>
            <input
              type="text"
              value={Email}
              size={20}
              onChange={(e) => setEmail(e.target.value)}
              className={`rounded-md px-2 w-1/2 bg-gray-50 ${Edit && "border-2 py-1 border-black"}`}
              disabled={!Edit}
            />
          </div>
          <div className="flex">
            <span className="w-1/2">Role : </span>
            <span className="w-1/2 px-2">
              {user?.role.slice(0, 1).toUpperCase().concat(user.role.slice(1))}
            </span>
          </div>
          <div className="flex">
            <span className="w-1/2">Provider : </span>
            <span className="w-1/2 px-2">
              {user?.provider
                .slice(0, 1)
                .toUpperCase()
                .concat(user?.provider.slice(1))}
            </span>
          </div>
        </div>
      </div>

      <div>
        {!Edit ? (
          <button
            className="w-full bg-black text-white rounded-md font-medium text-lg justify-center items-center flex p-2"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className={`w-full ${Submitting ? "bg-gray-300" : "bg-red-500"} text-white rounded-md font-medium text-lg justify-center items-center flex p-2`}
            onClick={() => handleSubmit()}
          >
            {Submitting ? "Updating..." : "Save"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
