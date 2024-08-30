"use server";
import connectToDB from "@utils/database";
import Hall from "@models/hall";
import mongoose from "mongoose";

export async function updateCapacity({
  ID,
  halls,
  seating,
  maxcapacity,
  lawns,
}) {
  try {
    await connectToDB();
    var docId = new mongoose.Types.ObjectId(ID);
    await Hall.findOneAndUpdate(
      { _id: docId },
      { halls: halls, seating: seating, maxcapacity: maxcapacity, lawns: lawns }
    );
    return { msg: "success" };
  } catch (e) {
    return new Response(e);
  }
}

export async function updatePrice({ Data, locationID }) {
  try {
    var doc_id = new mongoose.Types.ObjectId(locationID);
    await connectToDB();
    await Hall.findOneAndUpdate(
      { _id: doc_id },
      { veg: Data.Veg, nonveg: Data.Nonveg, decor: Data.Decor, room: Data.Room }
    );
    return { msg: "success" };
  } catch (error) {
    return { msg: "error" };
  }
}

export async function updateFeature({ Feature, locationID }) {
  try {
    var doc_id = new mongoose.Types.ObjectId(locationID);
    await connectToDB();
    await Hall.findOneAndUpdate(
      { _id: doc_id },
      { title: Feature.title, description: Feature.description, done: true }
    );
    return { msg: "success" };
  } catch (error) {
    return { msg: "error" };
  }
}

export async function updateHall(data) {
  try {
    await connectToDB();
    await Hall.findOneAndUpdate(
      { _id: data._id },
      {
        title: data.title,
        description: data.description,
        location: data.location,
        room: Number(data.room),
        veg: Number(data.veg),
        nonveg: Number(data.nonveg),
        decor: Number(data.decor),
        halls: Number(data.halls),
        maxcapacity: Number(data.maxcapacity),
        lawns: Number(data.lawns),
        seating: Number(data.seating),
      }
    );
    return { msg: "success" };
  } catch (e) {
    return { msg: "error" };
  }
}
