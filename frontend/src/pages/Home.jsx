import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Features from "../components/home/Features";
import Bots from "../components/home/Bots";
import AnalyticsPreview from "../components/home/AnalyticsPreview";
import Reputation from "../components/home/Reputation";
import CategoryIntelligence from "../components/home/CategoryIntelligence";
import VerificationAPI from "../components/VerificationAPI";
import Advertising from "../components/home/Advertising";
import Pricing from "../components/home/Pricing";
import Footer from "../components/home/Footer";

export default function Home() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBot, setSelectedBot] = useState(null);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/bot");
        setBots(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch bots:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBots();
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#f7f9fc]">

      {/* Navigation Layer */}
      <Header />

      {/* Hero Layer */}
      <section>
        <Hero />
        <Features />
         <Bots />
          <AnalyticsPreview />
           <Reputation />
           <CategoryIntelligence />
           <VerificationAPI />
           <Advertising />
           <Pricing />
           <Footer />
      </section>

      {/* Value Proposition Layer */}
      <section className="max-w-6xl mx-auto px-6 mt-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          Discover the Best Telegram Bots
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Find, verify, and interact with top-performing Telegram bots in one place.
        </motion.p>
      </section>

            {/* Top Bots of the Week - Vertical List */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold mb-6">Top Bots of the Week</h2>
        <div className="space-y-4">
          {bots.slice(0, 6).map((bot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white border rounded-xl shadow cursor-pointer flex items-center justify-between"
              onClick={() => setSelectedBot(bot)}
            >
              <div>
                <h3 className="font-semibold">{bot.username}</h3>
                <p className="text-sm text-gray-600">{bot.status}</p>
              </div>
              <div className="h-10 w-10 bg-[#0088cc] rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Bots - Vertical List */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Bots</h2>
        <div className="space-y-4">
          {bots.slice(6, 12).map((bot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white border rounded-xl shadow cursor-pointer flex items-center justify-between"
              onClick={() => setSelectedBot(bot)}
            >
              <div>
                <h3 className="font-semibold">{bot.username}</h3>
                <p className="text-sm text-gray-600">{bot.status}</p>
              </div>
              <div className="h-10 w-10 bg-[#00cc88] rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sponsored Category - Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold mb-6">Sponsored Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.slice(12, 18).map((bot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white border rounded-xl shadow border-yellow-400 cursor-pointer"
              onClick={() => setSelectedBot(bot)}
            >
              <h3 className="font-semibold">{bot.username}</h3>
              <p className="text-sm text-gray-600">{bot.status}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use-case / Scenario Layer */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-semibold mb-6">How You Can Use These Bots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Automate tasks and reminders",
            "Enhance team productivity",
            "Access real-time AI tools",
            "Entertainment and games",
            "Finance tracking",
            "Education & learning support"
          ].map((usecase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-5 bg-white border rounded-xl shadow text-center"
            >
              {usecase}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics / Proof Layer */}
      <section className="max-w-6xl mx-auto px-6 mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-6">Platform Metrics</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: "Bots Listed", value: bots.length },
            { label: "Verified Owners", value: 120 },
            { label: "Active Users", value: 3500 },
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="p-6 bg-white border rounded-xl shadow min-w-[160px]"
            >
              <p className="text-3xl font-bold text-[#0088cc]">{metric.value}</p>
              <p className="text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials / Social Validation Layer */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Alice", comment: "Verified bots helped me automate everything." },
            { name: "Bob", comment: "Great directory for exploring new Telegram bots." },
            { name: "Carol", comment: "Loved the metrics and verification system." },
          ].map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="p-5 bg-white border rounded-xl shadow"
            >
              <p className="text-gray-600 mb-2">"{testi.comment}"</p>
              <p className="font-semibold text-gray-800">{testi.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing / Plan Comparison Layer */}
      <section className="max-w-6xl mx-auto px-6 mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-6">Plans & Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Free", price: "$0", features: ["Access to basic bots", "View stats"] },
            { name: "Pro", price: "$9.99/mo", features: ["All Free features", "Advanced metrics", "Verified bot badges"] },
            { name: "Enterprise", price: "$29.99/mo", features: ["All Pro features", "Custom integrations", "Priority support"] },
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="p-6 bg-white border rounded-xl shadow text-center"
            >
              <p className="text-xl font-semibold mb-2">{plan.name}</p>
              <p className="text-3xl font-bold text-[#0088cc] mb-4">{plan.price}</p>
              <ul className="text-gray-600 mb-4">
                {plan.features.map((f, i) => (
                  <li key={i} className="mb-1">{f}</li>
                ))}
              </ul>
              <button className="px-6 py-2 bg-[#0088cc] text-white rounded-xl">Get Started</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Layer */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How do I verify my bot?", a: "Submit your bot for review and follow the verification instructions." },
            { q: "Can I use the bots for free?", a: "Yes, basic features are free for all users." },
            { q: "How do I upgrade my plan?", a: "Go to the pricing section and select your preferred plan." },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-4 bg-white border rounded-xl shadow"
            >
              <p className="font-semibold">{faq.q}</p>
              <p className="text-gray-600 mt-1">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Layer */}
      <section className="max-w-6xl mx-auto px-6 mt-20 text-center py-16 bg-[#0088cc] text-white rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Get Started with Top Bots Today</h2>
        <p className="text-lg mb-6">Join thousands of users and access verified Telegram bots instantly.</p>
        <button className="px-8 py-3 bg-white text-[#0088cc] font-semibold rounded-xl">Explore Bots</button>
      </section>

      {/* Footer Layer */}
      <footer className="w-full py-10 text-center text-gray-600 mt-20">
        TelBots — Telegram Bot Directory
      </footer>

      {/* Selected Bot Modal */}
      {selectedBot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-6 rounded-xl max-w-md w-full"
          >
            <h2 className="text-xl font-semibold mb-4">{selectedBot.username}</h2>
            <p>Status: {selectedBot.status}</p>
            <p>Created At: {new Date(selectedBot.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(selectedBot.updatedAt).toLocaleString()}</p>
            <button
              onClick={() => setSelectedBot(null)}
              className="mt-4 px-4 py-2 bg-[#0088cc] text-white rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

    </main>
  );
}
