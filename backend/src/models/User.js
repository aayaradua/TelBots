import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    telegramUserid: {
      type: String,
      required: true,
    },

    telegramUsername: {
      type: String,
      required: true,
    },

    planChoosen: {
      type: String,
      enum: ["starter", "pro", "enterprise"],
      default: "starter",
      required: true,
    },

    hasActivePlan: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: String,
    verificationToken: String,
    verificationTokenExpires: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
