import mongoose, { Schema } from "mongoose";
import { stringify } from "postcss";

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      unique: true,
    },
    publishDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    numCitation: {
      type: Number,
      default: 0,
    },
    authors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    abstract: {
      type: String,
      required: true,
      max: 500,
    },
    previewUrl: {
      type: String,
      default: null,
    },
    fullViewUrl: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "uploaded"],
      default: "pending",
    },
    tags: {
      type: String,
      default: "science",
    },
  },
  { timestamps: true }
);

export const File = mongoose.models.File || mongoose.model("File", fileSchema);
