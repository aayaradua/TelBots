import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function TelBotsHeader() {
  const [open, setOpen] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [botUsername, setBotUsername] = useState("");
  const [botData, setBotData] = useState(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const categories = ["Utilities", "Entertainment", "AI", "Finance", "Productivity", "Education"];

   const handleSubmit = (e) => {
    e.preventDefault();
    if (!botUsername) return;
    // handle submission logic here (API call)
    console.log("Submitted bot:", botUsername);
    setBotUsername("");
    onClose();
  };
  async function submitFinalBot() {
  const res = await axios.post(
    "http://localhost:3000/api/bots/submit",
    {
      username: botData.username,
      category,
      subcategory
    }
  );

  console.log("Saved:", res.data);
}


  return (
    <>
      <header className="w-full bg-[#0088cc] text-white px-6 py-4 shadow-md fixed top-0 left-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto flex items-center justify-between relative"
        >
          <motion.h1 className="text-2xl md:text-3xl font-bold cursor-pointer">
            TelBots
          </motion.h1>

          <nav className="hidden md:flex items-center gap-8 text-lg font-light">
            <motion.a className="cursor-pointer hover:text-white/80">Home</motion.a>

            <motion.a
              className="cursor-pointer hover:text-white/80"
              onClick={() => setOpen(!open)}
            >
              Categories
            </motion.a>

            <motion.a
              className="cursor-pointer hover:text-white/80"
              onClick={() => setShowPopular(!showPopular)}
            >
              Popular
            </motion.a>

            <motion.a 
            className="cursor-pointer hover:text-white/80"
            onClick={() => setShowSubmit(true)}
            
            >
              Submit Bot
            </motion.a>
          </nav>
        </motion.div>

        {/* Categories dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {cat}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Popular modal — outside header */}
      <AnimatePresence>
        {showPopular && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold">Popular Bots</h2>
                <button
                  onClick={() => setShowPopular(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "File Converter Bot",
                  "AI Chat Bot",
                  "Music Download Bot",
                  "Weather Alerts",
                  "Crypto Tracker",
                  "Sticker Maker",
                ].map((bot, i) => (
                  <motion.div
                    key={bot}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-5 bg-gray-50 rounded-xl border shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-100 transition-all"
                  >
                    <div className="h-12 w-12 bg-[#0088cc] rounded-full mb-3 flex items-center justify-center text-white font-bold">
                      {bot.split(" ")[0][0]}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{bot}</h3>
                    <p className="text-sm text-gray-600">Tap to view details</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
<AnimatePresence>
  {showSubmit && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Submit a Bot</h2>
          <button
            onClick={() => setShowSubmit(false)}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!botUsername) return;
            try {
              const res = await axios.post(
                "http://localhost:3000/api/v1/user/submit-bot",
                { username: botUsername }
              );
              setBotData(res.data?.bot);
              setShowSubmit(false);
              setShowConfirm(true); 
            } catch (err) {
              console.log("Bot submission failed", err);
            }
            setBotUsername("");
          }}
        >
          <input
            type="text"
            placeholder="Bot Username"
            value={botUsername}
            onChange={(e) => setBotUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0088cc]"
            required
          />
          <button
            type="submit"
            className="bg-[#0088cc] text-white p-3 rounded-lg hover:bg-[#0077b3] transition-colors"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>

{/* Step 2 modal (confirm bot + category) */}
<AnimatePresence>
  {showConfirm && botData && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Confirm Bot Submission</h2>
          <button
            onClick={() => setShowConfirm(false)}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">{botData.name}</h3>
          <p className="text-sm text-gray-600">@{botData.username}</p>
          {botData.photo && (
            <img
              src={botData.logo}
              alt={botData.name}
              className="w-full h-40 object-cover rounded-md"
            />
          )}
          <p className="text-gray-700">{botData.description}</p>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0088cc]"
          >
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0088cc]"
          />

          <button
            onClick={submitFinalBot}
            className="bg-[#0088cc] text-white p-3 rounded-lg hover:bg-[#0077b3] transition-colors"
          >
            Confirm & Submit
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

    </>
  );
}
