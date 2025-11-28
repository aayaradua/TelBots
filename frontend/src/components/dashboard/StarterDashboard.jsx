import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { plans } from "../../data/plans";

export default function StarterDashboard() {
  const { bots, loading } = useAppContext();
  const plan = plans.find(p => p.id === "starter");

  return (
    <section className="w-full bg-black min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Plan Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 p-6 bg-neutral-900 rounded-2xl border border-neutral-800"
        >
          <h2 className="text-3xl font-bold text-white mb-4">{plan.name} Plan</h2>
          <p className="text-neutral-400 mb-4">{plan.price}</p>
          <ul className="list-disc list-inside text-neutral-400">
            {plan.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </motion.div>

        {loading && <p className="text-neutral-400">Loading…</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {bots.map((bot, idx) => (
            <motion.div
              key={bot._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-lg"
            >
              {/* Bot Header */}
              <div className="flex items-center gap-4 mb-6">
                <img src={bot.photo} alt={bot.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h2 className="text-xl font-bold text-white">{bot.name}</h2>
                  <p className="text-neutral-400 text-sm">{bot.username}</p>
                </div>
              </div>

              {/* Starter Plan Only Info */}
              <div className="mb-6">
                <h3 className="text-neutral-300 font-semibold mb-4">Bot Info</h3>
                <div className="space-y-2 text-neutral-400 text-sm">
                  <p>Verification: <span className="text-white">{bot.verified ? "Verified" : "Not Verified"}</span></p>
                  <p>Trust Score: <span className="text-white">{bot.trustScore}</span></p>
                  <p>Category: <span className="text-white">{bot.category}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
