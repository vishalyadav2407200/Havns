import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
