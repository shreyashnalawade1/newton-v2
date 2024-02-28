// import mongoose, { mongo } from "mongoose";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      min: 3,
    },
    img: {
      type: String,
      default: "https://github.com/shadcn.png",
    },
    ownedFiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
