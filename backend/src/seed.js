import mongoose from "mongoose";
import { User } from "./models/User.js";
import bcrypt from "bcrypt";

await mongoose.connect("mongodb+srv://aayaradua:ululalbab2018@cluster-1.dharfjb.mongodb.net/TelBots?retryWrites=true&w=majority&appName=Cluster-1");

const seed = async () => {
  const hashed = await bcrypt.hash("Password123", 10);

  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashed,
    username: "tester",
    telegramUserid: "123456789",
    telegramUsername: "test_tg",
    planChoosen: "starter",
    isVerified: true,
  });

  process.exit(0);
};

seed();
