import cron from "node-cron";
import { Bot } from "../models/Bot.js";

cron.schedule("*/30 * * * *", async () => {
  const bots = await Bot.find();

  const verificationRequests = await Bot.countDocuments({ verificationStatus: { $in: ["pending", "verified", "rejected"] } });
  const verificationSuccess = await Bot.countDocuments({ verificationStatus: "verified" });

  for (const bot of bots) {
    const botsInCategory = await Bot.find({ category: bot.category });

    const categoryTopBots = botsInCategory.filter(b => b.isTopBot).length;
    const avgCategoryClicks = botsInCategory.length > 0 ? botsInCategory.reduce((sum, b) => sum + b.clicks, 0) / botsInCategory.length : 0;

    const subCatCount = {};
    botsInCategory.forEach(b => {
      const subId = b.subCategory.toString();
      subCatCount[subId] = (subCatCount[subId] || 0) + 1;
    });
    const trendingTopics = Object.entries(subCatCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([subCatId]) => subCatId);

    // Sponsored
    const sponsoredBots = botsInCategory.filter(b => b.isSponsored && b.sponsoredUntil > new Date());
    const sponsored = {
      campaigns: sponsoredBots.length,
      impressions: sponsoredBots.reduce((sum, b) => sum + b.impressions, 0),
      clicks: sponsoredBots.reduce((sum, b) => sum + b.clicks, 0)
    };

    // Search ads
    const searchAdsBots = botsInCategory.filter(b => b.searchAdsActive);
    const searchAds = {
      active: searchAdsBots.length,
      clicks: searchAdsBots.reduce((sum, b) => sum + (b.searchAdClicks || 0), 0),
      costUSD: searchAdsBots.reduce((sum, b) => sum + (b.searchAdCost || 0), 0)
    };

    // High-volume analytics
    const highVolumeAnalytics = {
      monthlyDataPoints: botsInCategory.reduce((sum, b) => sum + b.clicks + b.visits + b.impressions, 0),
      reportTime: "3s",
      trends: ["impressions", "clicks", "rank"]
    };

    await Bot.updateOne(
      { _id: bot._id },
      {
        $set: {
          "enterpriseAnalytics.verificationRequests": verificationRequests,
          "enterpriseAnalytics.verificationSuccess": verificationSuccess,
          "enterpriseAnalytics.categoryTopBots": categoryTopBots,
          "enterpriseAnalytics.avgCategoryClicks": avgCategoryClicks,
          "enterpriseAnalytics.trendingTopics": trendingTopics,
          "enterpriseAnalytics.sponsored": sponsored,
          "enterpriseAnalytics.searchAds": searchAds,
          "enterpriseAnalytics.highVolumeAnalytics": highVolumeAnalytics
        }
      }
    );
  }

  console.log("[CRON] Enterprise analytics updated");
});
