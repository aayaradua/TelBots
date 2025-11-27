import mongoose from "mongoose";

const botSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Types.ObjectId,
    ref: "user"
  },
  name: String,
  username: String,
  botUrl: String,
  description: String,
  logo: String,

  activeUsers: Number,
  weeklyScore: Number,

  sponsoredUntill: Date,
  featuredUntill: Date,
  hasActivePlan: Boolean,
  planChoosen: {
    type: String,
    required: true,
    enum: ["starter", "pro", "enterprice"]
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },
  isSponsored: {
    type: Boolean,
    default: false,
  },
  isTopBot: {
    type: Boolean,
    default: false,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
  },

  verificationStatus: {
    type: String,
    enum: ["unverified", "pending", "verified", "rejected"],
    default: "unverified",
  },

  ownerProof: {
    code: String,
    submittedAt: Date,
  },

  commands: [
    {
      command: String,
      description: String,
    },
  ],

  /* --------------------------------------------
     🔥 NEW FIELDS ADDED FROM YOUR DASHBOARD DATA
     -------------------------------------------- */

  // Basic metrics
  trustScore: Number,
  lastSync: Date,
  impressions: Number,
  visits: Number,
  clicks: Number,
  rank: Number,
  dailyClicks: Number,
  topCountry: String,

  // Reviews
  reviews: [
    {
      user: String,
      message: String,
      rating: Number,
    },
  ],

  // Pro Analytics
  proAnalytics: {
    categoryBots: Number,
    avgCategoryClicks: Number,
    topSubCategories: [String],
    avgRating: Number,
    totalReviews: Number,
  },

  // Enterprise Analytics
  enterpriseAnalytics: {
    verificationRequests: Number,
    verificationSuccess: Number,

    categoryTopBots: Number,
    avgCategoryClicks: Number,
    trendingTopics: [String],

    sponsored: {
      campaigns: Number,
      impressions: Number,
      clicks: Number,
    },

    searchAds: {
      active: Number,
      clicks: Number,
      costUSD: Number,
    },

    highVolumeAnalytics: {
      monthlyDataPoints: Number,
      reportTime: String,
      trends: [String],
    },
  },
}, { timestamps: true });

export const Bot = mongoose.model("bot", botSchema);
