import { Schema, model, models } from "mongoose";

const meetingSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  hall: {
    type: Schema.Types.ObjectId,
    ref: "hall",
  },
  meetDate: {
    type: String,
  },
  meetTime: {
    type: String,
  },
  status: {
    type: String,
    enum: ["accepted", "declined", "pending"],
    default: "pending",
  },
  meeting: {
    type: Object,
  },
});

const meetingModel = models.meeting || model("meeting", meetingSchema);

export default meetingModel;
