import React from "react";
import { motion } from "framer-motion";

const BotInfoCard = ({ bot }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left section: bot basic info */}
      <div className="flex-1 mb-4 md:mb-0">
        <h2 className="text-2xl font-bold mb-1">{bot.name}</h2>
        <p className="text-sm text-gray-500 mb-2">@{bot.username}</p>
        <p className="text-gray-700 mb-2">{bot.description}</p>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            bot.status === "verified"
              ? "bg-green-100 text-green-800"
              : bot.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {bot.status}
        </span>
      </div>

      {/* Right section: key metrics */}
      <div className="flex space-x-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">{bot.users}</p>
          <p className="text-sm text-gray-500">Users</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-500">{bot.clicks}</p>
          <p className="text-sm text-gray-500">Clicks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">{bot.createdAt}</p>
          <p className="text-sm text-gray-500">Created</p>
        </div>
      </div>

      {/* Optional action buttons */}
      <div className="mt-4 md:mt-0 flex space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
          Edit
        </button>
      </div>
    </motion.div>
  );
};

export default BotInfoCard;
