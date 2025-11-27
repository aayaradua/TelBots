import cron from "node-cron";
import { Bot } from "../models/Bot.js";

cron.schedule("*/15 * * * *", async () => {
  const bots = await Bot.find();

  for (const bot of bots) {
    // 1. category bots & avgCategoryClicks
    const botsInCategory = await Bot.find({ category: bot.category });
    const categoryBots = botsInCategory.length;
    const totalClicks = botsInCategory.reduce((sum, b) => sum + b.clicks, 0);
    const avgCategoryClicks = categoryBots > 0 ? totalClicks / categoryBots : 0;

    // 2. topSubCategories
    const subCatCount = {};
    botsInCategory.forEach(b => {
      const subId = b.subCategory.toString();
      subCatCount[subId] = (subCatCount[subId] || 0) + 1;
    });
    const topSubCategories = Object.entries(subCatCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([subCatId]) => subCatId);

    // 3. avgRating and totalReviews
    const reviews = bot.reviews || [];
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
    const totalReviews = reviews.length;

    // 4. Update bot in database
    await Bot.updateOne(
      { _id: bot._id },
      {
        $set: {
          "proAnalytics.categoryBots": categoryBots,
          "proAnalytics.avgCategoryClicks": avgCategoryClicks,
          "proAnalytics.topSubCategories": topSubCategories,
          "proAnalytics.avgRating": avgRating,
          "proAnalytics.totalReviews": totalReviews,
        }
      }
    );
  }

  console.log("[CRON] Pro analytics updated with updateOne");
});
