import { timeStamp } from "console";
import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lists: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("List", listSchema);
