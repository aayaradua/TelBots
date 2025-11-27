import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [bots, setBots] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setBots([
        {
          _id: "101",
          name: "MegaReply AI",
          username: "@megareply_bot",
          photo: "/default-bot.png",
          verified: true,
          trustScore: 95,
          category: "Customer Support",
          subCategory: "Chat Automation",
          lastSync: "2025-11-23",
          impressions: 150000,
          visits: 42000,
          clicks: 12000,
          rank: 1,
          dailyClicks: 580,
          topCountry: "USA",
          reviews: [
            { user: "Alice", message: "Exceptional automation!", rating: 5 },
            { user: "Bob", message: "Saves us tons of time.", rating: 4 }
          ],
          proAnalytics: {
            categoryBots: 15,
            avgCategoryClicks: 8000,
            topSubCategories: ["Chat Automation", "Support AI"],
            avgRating: 4.5,
            totalReviews: 42
          },
          enterpriseAnalytics: {
            verificationRequests: 1200,
            verificationSuccess: 1170,
            categoryTopBots: 5,
            avgCategoryClicks: 9800,
            trendingTopics: ["AI chat", "support automation"],
            sponsored: { campaigns: 2, impressions: 12000, clicks: 3200 },
            searchAds: { active: 1, clicks: 450, costUSD: 120 },
            highVolumeAnalytics: { monthlyDataPoints: 500000, reportTime: "2s", trends: ["clicks", "visits", "rank"] }
          }
        },
        {
          _id: "102",
          name: "CryptoGuard Pro",
          username: "@cryptoguard_bot",
          photo: "/default-bot.png",
          verified: true,
          trustScore: 89,
          category: "Finance",
          subCategory: "Crypto Alerts",
          lastSync: "2025-11-22",
          impressions: 98000,
          visits: 27000,
          clicks: 8900,
          rank: 2,
          dailyClicks: 410,
          topCountry: "UK",
          reviews: [
            { user: "David", message: "Accurate and reliable alerts.", rating: 5 },
            { user: "Eva", message: "Very helpful for tracking prices.", rating: 4 }
          ],
          proAnalytics: {
            categoryBots: 10,
            avgCategoryClicks: 7500,
            topSubCategories: ["Crypto Alerts", "Portfolio Tracker"],
            avgRating: 4.3,
            totalReviews: 35
          },
          enterpriseAnalytics: {
            verificationRequests: 900,
            verificationSuccess: 870,
            categoryTopBots: 3,
            avgCategoryClicks: 7500,
            trendingTopics: ["bitcoin", "ethereum", "altcoins"],
            sponsored: { campaigns: 1, impressions: 8000, clicks: 2100 },
            searchAds: { active: 2, clicks: 380, costUSD: 95 },
            highVolumeAnalytics: { monthlyDataPoints: 300000, reportTime: "3s", trends: ["impressions", "clicks", "rank"] }
          }
        },
        {
          _id: "103",
          name: "WeatherMax",
          username: "@weathermax_bot",
          photo: "/default-bot.png",
          verified: true,
          trustScore: 91,
          category: "Information",
          subCategory: "Weather",
          lastSync: "2025-11-21",
          impressions: 72000,
          visits: 18000,
          clicks: 4300,
          rank: 4,
          dailyClicks: 200,
          topCountry: "Canada",
          reviews: [
            { user: "Amir", message: "Very accurate forecasts.", rating: 5 },
            { user: "Nina", message: "Love the daily alerts!", rating: 4 }
          ],
          proAnalytics: {
            categoryBots: 12,
            avgCategoryClicks: 6200,
            topSubCategories: ["Weather Alerts", "Forecast AI"],
            avgRating: 4.4,
            totalReviews: 28
          },
          enterpriseAnalytics: {
            verificationRequests: 500,
            verificationSuccess: 490,
            categoryTopBots: 4,
            avgCategoryClicks: 6200,
            trendingTopics: ["temperature", "rain alerts", "weather radar"],
            sponsored: { campaigns: 0, impressions: 0, clicks: 0 },
            searchAds: { active: 1, clicks: 120, costUSD: 45 },
            highVolumeAnalytics: { monthlyDataPoints: 200000, reportTime: "1.5s", trends: ["clicks", "visits"] }
          }
        }
      ]);

      setLoading(false);
    }, 400);
  }, []);

  return (
    <section className="w-full bg-black min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold text-white mb-12"
        >
          Your Bot Dashboard
        </motion.h1>

        {loading && <p className="text-neutral-400">Loading…</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {bots.map((bot, idx) => (
            <motion.div
              key={bot._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-lg"
            >
              {/* HEADER */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={bot.photo}
                  alt={bot.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">{bot.name}</h2>
                  <p className="text-neutral-400 text-sm">{bot.username}</p>
                </div>
              </div>

              {/* Bot State */}
              <div className="mb-6">
                <h3 className="text-neutral-300 font-semibold mb-4">Bot State</h3>
                <div className="space-y-2 text-neutral-400 text-sm">
                  <p>Verification: <span className="text-white">{bot.verified ? "Verified" : "Not Verified"}</span></p>
                  <p>Trust Score: <span className="text-white">{bot.trustScore}</span></p>
                  <p>Category: <span className="text-white">{bot.category}</span></p>
                  <p>Sub Category: <span className="text-white">{bot.subCategory}</span></p>
                  <p>Last Sync: <span className="text-white">{bot.lastSync}</span></p>
                </div>
              </div>

              {/* Visibility Intelligence */}
              <div className="mb-6">
                <h3 className="text-neutral-300 font-semibold mb-4">Visibility Intelligence</h3>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.impressions}</p>
                    <p className="text-neutral-500 text-xs">Impressions</p>
                  </div>

                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.visits}</p>
                    <p className="text-neutral-500 text-xs">Visits</p>
                  </div>

                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.clicks}</p>
                    <p className="text-neutral-500 text-xs">Clicks</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-neutral-400 text-sm">
                    Category Rank: <span className="text-white">{bot.rank}</span>
                  </p>
                </div>
              </div>

              {/* Audience Analytics */}
              <div className="mb-6">
                <h3 className="text-neutral-300 font-semibold mb-4">Audience Analytics</h3>

                <div className="bg-black border border-neutral-800 rounded-xl p-4">
                  <p className="text-neutral-400 text-sm mb-2">Daily Clicks</p>
                  <p className="text-3xl font-bold text-white">{bot.dailyClicks}</p>
                </div>

                <div className="mt-4">
                  <p className="text-neutral-400 text-sm">Top Country</p>
                  <p className="text-white text-lg font-semibold">{bot.topCountry}</p>
                </div>
              </div>

              {/* PRO ANALYTICS */}
              <div className="mb-6">
                <h3 className="text-neutral-300 font-semibold mb-4">Pro Analytics</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.proAnalytics.totalReviews}</p>
                    <p className="text-neutral-500 text-xs">Total Reviews</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.proAnalytics.avgRating.toFixed(1)}</p>
                    <p className="text-neutral-500 text-xs">Average Rating</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.proAnalytics.categoryBots}</p>
                    <p className="text-neutral-500 text-xs">Bots in Category</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.proAnalytics.avgCategoryClicks}</p>
                    <p className="text-neutral-500 text-xs">Avg Category Clicks</p>
                  </div>
                </div>
              </div>

              {/* ENTERPRISE ANALYTICS */}
              <div className="mb-6">
                <h3 className="text-neutral-300 font-semibold mb-4">Enterprise Analytics</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.verificationRequests}</p>
                    <p className="text-neutral-500 text-xs">Verification Requests</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.verificationSuccess}</p>
                    <p className="text-neutral-500 text-xs">Successful Verifications</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.categoryTopBots}</p>
                    <p className="text-neutral-500 text-xs">Top Bots in Category</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.avgCategoryClicks}</p>
                    <p className="text-neutral-500 text-xs">Avg Category Clicks</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.sponsored.campaigns}</p>
                    <p className="text-neutral-500 text-xs">Sponsored Campaigns</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.sponsored.impressions}</p>
                    <p className="text-neutral-500 text-xs">Sponsored Impressions</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.sponsored.clicks}</p>
                    <p className="text-neutral-500 text-xs">Sponsored Clicks</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.searchAds.active}</p>
                    <p className="text-neutral-500 text-xs">Active Search Ads</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.searchAds.clicks}</p>
                    <p className="text-neutral-500 text-xs">Search Ad Clicks</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4">
                    <p className="text-2xl text-white font-bold">${bot.enterpriseAnalytics.searchAds.costUSD}</p>
                    <p className="text-neutral-500 text-xs">Search Ad Cost</p>
                  </div>
                  <div className="bg-black border border-neutral-800 rounded-xl p-4 col-span-2">
                    <p className="text-2xl text-white font-bold">{bot.enterpriseAnalytics.highVolumeAnalytics.monthlyDataPoints}</p>
                    <p className="text-neutral-500 text-xs">Monthly Data Points</p>
                  </div>
                </div>
              </div>

              {/* User Reviews */}
              <div className="mt-8">
                <h3 className="text-neutral-300 font-semibold mb-4">User Reviews</h3>
                <div className="space-y-3">
                  {bot.reviews.length > 0 ? (
                    bot.reviews.map((review, rIdx) => (
                      <div
                        key={rIdx}
                        className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl"
                      >
                        <p className="text-white font-semibold">{review.user}</p>
                        <p className="text-neutral-400 text-sm">{review.message}</p>

                        <p className="text-yellow-400 mt-1 text-sm">
                          {"★".repeat(review.rating)}
                          <span className="text-neutral-600">
                            {"☆".repeat(5 - review.rating)}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-500 text-sm">No reviews yet.</p>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
