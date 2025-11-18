import React from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const reviewsData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Reviews",
      data: [12, 19, 14, 18, 20, 22, 25],
      borderColor: "#3B82F6",
      backgroundColor: "#3B82F6",
      tension: 0.3,
    },
  ],
};

const reviews = [
  { user: "Alice", comment: "Amazing bot!", rating: 5 },
  { user: "Bob", comment: "Very useful", rating: 4 },
  { user: "Charlie", comment: "Good experience", rating: 4.5 },
];

const UserReviewsCard = () => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow p-6"
      whileHover={{ scale: 1.03 }}
    >
      <h2 className="text-lg font-semibold mb-2">User Reviews</h2>

      <motion.div
        className="text-4xl font-bold text-blue-500 mb-1"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        4.5/5
      </motion.div>

      <p className="text-sm text-gray-500 mb-4">{reviews.length} reviews</p>

      <div className="mb-4">
        <Line key="reviewsChart" data={reviewsData} options={{ plugins: { legend: { display: false } } }} />
      </div>

      <div className="overflow-y-auto max-h-40">
        {reviews.map((r, i) => (
          <div key={i} className="border-b py-2">
            <div className="flex justify-between">
              <span className="font-medium">{r.user}</span>
              <span className="text-yellow-500">{`${r.rating} ★`}</span>
            </div>
            <p className="text-sm text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserReviewsCard;
