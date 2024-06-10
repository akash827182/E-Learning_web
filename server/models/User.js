import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: "",
      default: "user",
    },
    subscription: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", Schema);
