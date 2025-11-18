import React from "react";
import { motion } from "framer-motion";
import UserReviewsCard from "../components/UserReviewsCard";
import BotUsersCard from "../components/BotUsersCard";
import BotClicksCard from "../components/BotClicksCard";
import BotInfoCard from "../components/BotInfoCard";

// Example bot data (replace with API response)
const botData = {
  name: "WeatherBot",
  username: "weather_bot",
  description: "Provides live weather updates for your city.",
  status: "verified",
  users: 1500,
  clicks: 1760,
  createdAt: "2025-11-01",
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Grid layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Full-width Bot Info Card */}
        <motion.div
          className="col-span-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BotInfoCard bot={botData} />
        </motion.div>

        {/* User Reviews Card */}
        <motion.div
          className="col-span-12 md:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <UserReviewsCard />
        </motion.div>

        {/* Bot Users Card */}
        <motion.div
          className="col-span-12 md:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BotUsersCard />
        </motion.div>

        {/* Bot URL Clicks Card */}
        <motion.div
          className="col-span-12 md:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <BotClicksCard />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
