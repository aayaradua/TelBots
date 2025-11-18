import React from "react";
import { motion } from "framer-motion";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const usersData = {
  labels: ["Active", "New"],
  datasets: [
    {
      data: [1200, 300],
      backgroundColor: ["#10B981", "#3B82F6"],
      borderWidth: 0,
    },
  ],
};

const trendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Users",
      data: [1000, 1050, 1100, 1150, 1200, 1250, 1300],
      borderColor: "#3B82F6",
      fill: false,
      tension: 0.3,
    },
  ],
};

const BotUsersCard = () => {
  return (
    <motion.div className="bg-white rounded-xl shadow p-6" whileHover={{ scale: 1.03 }}>
      <h2 className="text-lg font-semibold mb-2">Bot Users</h2>

      <motion.div
        className="text-4xl font-bold mb-2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        1,500
      </motion.div>
      <p className="text-sm text-gray-500 mb-4">Total Users</p>

      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <Doughnut key="usersDoughnut" data={usersData} />
        </div>
        <div className="w-1/2">
          <Line key="usersTrend" data={trendData} options={{ plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </motion.div>
  );
};

export default BotUsersCard;
