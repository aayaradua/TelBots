import { Bot} from "../models/Bot.js";
import crypto from "crypto";
import fetch from "node-fetch";

export const requestVerification = async (req, res) => {
  const { botUsername } = req.body;
  const userId = req.user.id;

  const bot = await Bot.findOne({ username: botUsername });
  if (!bot) return res.status(404).json({ message: "Bot not found" });

  const code = crypto.randomBytes(6).toString("hex");
  bot.verificationStatus = "pending";
  bot.ownerProof = { code, submittedAt: new Date() };
  await bot.save();

  res.json({
    message: "Verification request submitted.",
    instructions: `Add this code to your bot description: ${code}`,
  });
};

export const checkVerificationStatus = async (req, res) => {
  const bot = await Bot.findById(req.params.botId);
  if (!bot) return res.status(404).json({ message: "Bot not found" });

  const metadata = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/getMe`);
  const data = await metadata.json();

  const description = data.result?.description || "";

  if (description.includes(bot.ownerProof.code)) {
    bot.verificationStatus = "verified";
    bot.reviewedAt = new Date();
    await bot.save();
    return res.json({ status: "verified" });
  }

  res.json({ status: bot.verificationStatus });
};
