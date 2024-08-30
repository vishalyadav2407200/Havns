"use server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuvidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import Photo from "@models/photos";
import Hall from "@models/hall";
import connectToDB from "@utils/database";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secert: process.env.CLOUD_API_SECERT,
});

export async function savePhotoToLocal(formdata) {
  const files = formdata.getAll("files");
  const multipleBufferPromise = files.map(async (file) => {
    if (file instanceof Blob || file instanceof File) {
      const data = await file.arrayBuffer();
      const buffer = Buffer.from(data);
      const name = uuvidv4();
      const ext = file.type.split("/")[1];
      const tempDir = os.tmpdir();
      const uploadDir = path.join(tempDir, `/${name}.${ext}`);
      await fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir, filename: file.name };
    } else {
      throw new Error("Invalid file object");
    }
  });
  return await Promise.all(multipleBufferPromise);
}

export async function uploadToCloudinary(newFiles) {
  const multiplePhotoPromise = newFiles.map((file) => {
    return cloudinary.v2.uploader.upload(file.filepath, {
      folder: "nextjs_upload",
    });
  });
  return await Promise.all(multiplePhotoPromise);
}

export async function uploadPhoto(formdata, location) {
  try {
    const res = new mongoose.Types.ObjectId(location);
    await connectToDB();
    const newFiles = await savePhotoToLocal(formdata);
    const photos = await uploadToCloudinary(newFiles);
    newFiles.map((file) => {
      fs.unlink(file.filepath);
    });
    if (res) {
      const newPhotos = photos.map((photo) => {
        const newPhoto = new Photo({
          location: res,
          public_id: photo.public_id,
          secure_url: photo.secure_url,
        });
        return newPhoto;
      });
      await Photo.insertMany(newPhotos);
    }
    return { msg: "success" };
  } catch (error) {
    return { msg: error.message };
  }
}

export async function getAllPhotos() {
  try {
    const result = await cloudinary.v2.search
      .expression("folder:nextjs_upload/*")
      .sort_by("created_at", "desc")
      .max_results(20)
      .execute();
    console.log(result);
    return { msg: "success" };
  } catch (error) {
    return { msg: error.message };
  }
}

export async function deletePhoto(public_id) {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
    await Photo.deleteMany({ public_id: public_id });
    return { msg: "success" };
  } catch (error) {
    return { msg: error.message };
  }
}
