import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    provider: {
      type: String,
      default: "credentials",
    },
    booked: {
      type: Array,
    },
    liked: {
      type: Array,
    },
  },
  { timestamps: true },
);

const UserModel = models.user || model("user", userSchema);

export default UserModel;
