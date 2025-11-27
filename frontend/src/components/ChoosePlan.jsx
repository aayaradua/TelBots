import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    features: [
      "Basic bot listing",
      "Organic ranking",
      "Public trust score (read-only)",
      "Community reviews",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19/mo",
    features: [
      "Verification badge",
      "Priority ranking",
      "Analytics dashboard",
      "Category insights",
      "Respond to reviews",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    features: [
      "Verification API",
      "Category intelligence",
      "Sponsored placements",
      "Search result ads",
      "High-volume analytics",
    ],
  },
];

export default function ChoosePlan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");

  const handleSelect = async (planId) => {
    setLoading(planId);
    try {
      await api.post("/billing/checkout", { planId });
      navigate("/dashboard");
    } catch {
      setLoading("");
    }
  };

  return (
    <section className="w-full min-h-screen bg-neutral-950 text-white py-24 flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full">

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-14 text-center"
        >
          Choose Your Plan
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl"
            >
              <p className="text-xl font-semibold mb-2">{plan.name}</p>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="text-sm text-neutral-400">
                    • {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(plan.id)}
                disabled={loading === plan.id}
                className="w-full py-3 rounded-xl bg-yellow-500 text-black font-semibold"
              >
                {loading === plan.id ? "Processing..." : "Select Plan"}
              </button>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
