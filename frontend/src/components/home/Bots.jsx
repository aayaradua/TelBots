import { motion } from "framer-motion";

const botSections = [
  {
    title: "Top Bots of the Week",
    bots: [
      { name: "@WeatherProBot", category: "Weather", rank: 1 },
      { name: "@NewsDigestBot", category: "News", rank: 2 },
      { name: "@CryptoAlertsBot", category: "Finance", rank: 3 },
    ],
  },
  {
    title: "Featured Bots",
    bots: [
      { name: "@FitTrackBot", category: "Health", rank: null },
      { name: "@LanguageCoachBot", category: "Education", rank: null },
    ],
  },
  {
    title: "Sponsored Category",
    bots: [
      { name: "@ShopSmartBot", category: "E-Commerce", rank: null },
      { name: "@TravelGuideBot", category: "Travel", rank: null },
    ],
  },
];

export default function Bots() {
  return (
    <section className="w-full bg-neutral-900 text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        {botSections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-6">{section.title}</h3>

            <ul className="space-y-4">
              {section.bots.map((bot, bIdx) => (
                <motion.li
                  key={bIdx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex justify-between items-center transition-all"
                >
                  <div>
                    <p className="font-semibold">{bot.name}</p>
                    <p className="text-neutral-400 text-sm">{bot.category}</p>
                  </div>
                  {bot.rank && (
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-semibold">
                      #{bot.rank}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
