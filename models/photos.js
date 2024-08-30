import { Schema, models, model } from "mongoose";

const photoSchema = new Schema(
  {
    location: {
      type: Schema.Types.ObjectId,
      ref: "hall",
    },
    public_id: String,
    secure_url: String,
  },
  { timestamps: true }
);

const PhotoModel = models.photo || model("photo", photoSchema);

export default PhotoModel;
