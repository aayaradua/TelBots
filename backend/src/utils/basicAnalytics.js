import cron from "node-cron";
import { Bot } from "../models/Bot.js";

// 1. Reset daily clicks
cron.schedule("0 0 * * *", async () => {
  await Bot.updateMany({}, { dailyClicks: 0 });
  console.log("[CRON] Daily clicks reset");
});

// 2. Update trust score
cron.schedule("0 */12 * * *", async () => {
  const bots = await Bot.find();
  for (const bot of bots) {
    const base = bot.visits + bot.clicks;
    const score = Math.min(100, Math.max(10, Math.floor(base / 1000)));

    await Bot.updateOne(
      { _id: bot._id },
      { $set: { trustScore: score } }
    );
  }
  console.log("[CRON] Trust scores updated");
});

// 3. Update ranks
cron.schedule("0 * * * *", async () => {
  const bots = await Bot.find().sort({ clicks: -1, impressions: -1 });
  let rank = 1;
  for (const bot of bots) {
    await Bot.updateOne(
      { _id: bot._id },
      { $set: { rank: rank++ } }
    );
  }
  console.log("[CRON] Ranks updated");
});

// 4. Collect stats
cron.schedule("*/15 * * * *", async () => {
  const bots = await Bot.find();
  for (const bot of bots) {
    const impressions = Math.floor(Math.random() * 500) + 50;
    const visits = Math.floor(impressions * 0.2);
    const clicks = Math.floor(visits * 0.3);

    await Bot.updateOne(
      { _id: bot._id },
      {
        $inc: {
          impressions: impressions,
          visits: visits,
          clicks: clicks,
          dailyClicks: clicks
        }
      }
    );
  }
  console.log("[CRON] Stats collected");
});

// 5. Update lastSync
cron.schedule("*/15 * * * *", async () => {
  await Bot.updateMany({}, { $set: { lastSync: new Date() } });
  console.log("[CRON] lastSync updated");
});
