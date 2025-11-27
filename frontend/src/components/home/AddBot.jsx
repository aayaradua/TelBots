import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function AddBot() {
  const [username, setUsername] = useState("");
  const [botData, setBotData] = useState(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchBot = async () => {
    setLoading(true);
    try {
      const res = await api.post("/bot/submit", { username: username });
      setBotData(res.data);
    } catch (err) {
      console.log("Error", err.message);
      //alert("Bot not found or error fetching from Telegram");
    } finally {
      setLoading(false);
    }
  };

  const saveBot = async () => {
    setSaving(true);
    try {
      await axios.post("/bots/save", {
        bot: botData,
        category,
        subCategory,
      });
      alert("Bot saved successfully!");
      setBotData(null);
      setUsername("");
      setCategory("");
      setSubCategory("");
    } catch (err) {
      alert("Error saving bot");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="w-full bg-black min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left Side: Form / Bot Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-lg"
        >
          {!botData && (
            <>
              <h1 className="text-3xl font-bold mb-4 text-white">Add Your Bot</h1>
              <p className="text-neutral-400 mb-6">
                Enter your bot username to fetch details from Telegram.
              </p>
              <input
                type="text"
                placeholder="@yourBot"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-neutral-700 text-white mb-6"
              />
              <motion.button
                onClick={fetchBot}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl"
              >
                {loading ? "Checking Telegram…" : "Fetch Bot"}
              </motion.button>
            </>
          )}

          {botData && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-white">{botData.name}</h2>
              <p className="text-neutral-400 mb-4">{botData.description}</p>

              <label className="text-neutral-400 text-sm">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-neutral-700 text-white mb-4"
              />

              <label className="text-neutral-400 text-sm">Sub Category</label>
              <input
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-neutral-700 text-white mb-6"
              />

              <motion.button
                onClick={saveBot}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-600 text-white font-bold p-4 rounded-xl"
              >
                {saving ? "Saving…" : "Confirm & Save Bot"}
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Right Side: Optional preview / code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-lg flex flex-col justify-center items-center"
        >
          {!botData && (
            <p className="text-neutral-400 text-center">
              After fetching, you'll see the bot's info here and confirm its category.
            </p>
          )}

          {botData && (
            <>
              <img
                src={botData.photo || "/default-bot.png"}
                alt={botData.name}
                className="w-32 h-32 rounded-full mb-4"
              />
              <p className="text-neutral-400 text-center">
                Preview of the bot pulled from Telegram.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
