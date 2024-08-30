import { Schema, models, model } from "mongoose";

const hallSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  location: {
    type: String,
    default: "",
  },
  halls: {
    type: Number,
    default: 0,
  },
  seating: {
    type: Number,
    default: 0,
  },
  maxcapacity: {
    type: Number,
    default: 0,
  },
  lawns: {
    type: Number,
    default: 0,
  },
  veg: {
    type: Number,
    default: 0,
  },
  nonveg: {
    type: Number,
    default: 0,
  },
  decor: {
    type: Number,
    default: 0,
  },
  room: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
  booked: {
    type: Array,
  },
});

hallSchema.index({ location: "text" });

const HallModel = models.hall || model("hall", hallSchema);

export default HallModel;
