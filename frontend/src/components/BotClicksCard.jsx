import React from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const clicksData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Clicks",
      data: [200, 250, 180, 300, 280, 350, 400],
      backgroundColor: "#3B82F6",
    },
  ],
};

const topSources = ["example.com", "referrer.io", "botlink.net"];

const BotClicksCard = () => {
  return (
    <motion.div className="bg-white rounded-xl shadow p-6" whileHover={{ scale: 1.03 }}>
      <h2 className="text-lg font-semibold mb-2">Bot URL Clicks</h2>

      <motion.div
        className="text-4xl font-bold mb-1"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.3 }}
      >
        1,760
      </motion.div>
      <p className="text-sm text-gray-500 mb-4">Total Clicks</p>

      <div className="mb-4">
        <Bar key="clicksChart" data={clicksData} options={{ plugins: { legend: { display: false } } }} />
      </div>

      <div>
        <h3 className="font-medium mb-2">Top Sources</h3>
        <ul className="text-sm text-gray-600">
          {topSources.map((src, i) => (
            <li key={i} className="flex justify-between py-1 border-b">
              <span>{src}</span>
              <span className="text-green-500">▲</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default BotClicksCard;
