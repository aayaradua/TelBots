import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Basic bot listing",
      "Organic ranking only",
      "Public trust score (read-only)",
      "Community reviews",
    ],
  },
  {
    name: "Pro",
    price: "$19/mo",
    features: [
      "Verification badge",
      "Priority ranking",
      "Analytics dashboard",
      "Category performance insights",
      "Respond to reviews",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Verification API access",
      "Category intelligence reports",
      "Sponsored placements",
      "Search result ads",
      "High-volume analytics",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="w-full bg-neutral-950 text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Pricing & Plans
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl"
            >
              <p className="text-xl font-semibold mb-2">{plan.name}</p>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>

              <ul className="space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="text-sm text-neutral-400">
                    • {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
