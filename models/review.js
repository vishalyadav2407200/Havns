import { Schema, models, model } from "mongoose";

const reviewSchema = new Schema(
  {
    HallId: {
      type: Schema.Types.ObjectId,
      ref: "hall",
    },
    name: {
      type: String,
      required: true,
    },
    image:{
      type: String,
    },
    stars: {
      type: Number,
      default: 0,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = models.review || model("review", reviewSchema);

module.exports = ReviewModel;
