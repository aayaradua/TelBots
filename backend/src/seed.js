import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./models/User.js";
import { Bot } from "./models/Bot.js";

await mongoose.connect(
  "mongodb+srv://aayaradua:ululalbab2018@cluster-1.dharfjb.mongodb.net/TelBots?retryWrites=true&w=majority&appName=Cluster-1"
);
const seed = async () => {
  // Clean old data (optional)
  await User.deleteMany({});
  await Bot.deleteMany({});

  // Hash password
  const hashed = await bcrypt.hash("Password123", 10);

  // 2. Create a user linked to this bot
  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashed,
    username: "tester",
    telegramUserid: "123456789",
    telegramUsername: "test_tg",
    planChoosen: "starter",
    hasActivePlan: true,
    botId: null,
    isVerified: true,
    stripeCustomerId: null,
    verificationToken: null,
    verificationTokenExpires: null,
  });


  // 1. Create a bot
  const bot = await Bot.create({
    userId: user._id,
    name: "Test Bot",
    username: "test_bot",
    botUrl: "https://t.me/test_bot",
    description: "A demo bot.",
    logo: "https://example.com/logo.png",

    activeUsers: 100,
    weeklyScore: 32,

    planChoosen: "starter",
    hasActivePlan: false,

    verificationStatus: "pending",

    commands: [
      { command: "/start", description: "Start command" },
      { command: "/info", description: "Information" },
    ],

    trustScore: 67,
    impressions: 1000,
    visits: 200,
    clicks: 50,
    dailyClicks: 3,
    topCountry: "Nigeria",
  });

  
  console.log("🌱 Seeding completed.");
  process.exit(0);
};
seed();

/*try {
  await User.updateOne({ _id: "69292d2261af8c23efc178bf"}, {
  $set: { botId: "69292d2261af8c23efc178c1"}
});
} catch (err) {console.log(err)}*/




