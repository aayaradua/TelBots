import { motion } from "framer-motion";

const features = [
  {
    title: "Verification Layer",
    description: "Eliminate fake bots, prove ownership, flag scam signals. Verified bots get more users.",
  },
  {
    title: "Promotion Layer",
    description: "Increase visibility with Top Bots, Featured, and Sponsored spots. Paid promotions drive traffic.",
  },
  {
    title: "Analytics Layer",
    description: "Track clicks, geography, and category performance. Subscription-based insights for bot owners.",
  },
  {
    title: "Reputation & Feedback",
    description: "Community reviews and ratings highlight quality bots. Owners manage visibility and responses.",
  },
  {
    title: "Category Intelligence",
    description: "Identify growth, underserved niches, and high-traffic categories. Paid insights for strategic positioning.",
  },
  {
    title: "Verification API",
    description: "External developers check bot verification, trust, and metadata via API. Revenue via API usage.",
  },
  {
    title: "Advertising Layer",
    description: "Targeted ad placements inside categories, trending lists, and search results. Paid by businesses and developers.",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Platform Layers & Features
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 hover:border-white transition-all"
            >
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-neutral-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
