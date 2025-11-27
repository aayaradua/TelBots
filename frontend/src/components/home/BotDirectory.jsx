import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function BotDirectory() {
  const [bots, setBots] = useState([]);
  const [featuredBots, setFeaturedBots] = useState([]);
  const [sponsoredBots, setSponsoredBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  const fetchBots = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/bot", {
        params: { search, category, page, pageSize },
      });
      setBots(res.data.bots);
      setTotalPages(res.data.totalPages);

      // fetch featured and sponsored separately
      const resFeatured = await axios.get("http://localhost:3000/api/v1/bot");
      setFeaturedBots(resFeatured.data.bots);

      const resSponsored = await axios.get("http://localhost:3000/api/v1/bot");
      setSponsoredBots(resSponsored.data.bot);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBots();
  }, [search, category, page]);

  const renderBotCard = (bot) => (
    <motion.div
      key={bot.username}
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex flex-col justify-between"
    >
      <div>
        <p className="text-xl font-semibold">{bot.username}</p>
        <p className="text-neutral-400 text-sm">{bot.category}</p>
        {bot.verified && (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-bold text-black bg-yellow-500 rounded">
            VERIFIED
          </span>
        )}
        {bot.sponsored && (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-bold text-white bg-purple-600 rounded">
            SPONSORED
          </span>
        )}
      </div>
      <div className="mt-4 text-sm text-neutral-400">
        Trust Score: {bot.trustScore || "N/A"}
      </div>
    </motion.div>
  );

  return (
    <section className="w-full bg-neutral-950 text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-center">All Telegram Bots</h3>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-lg bg-neutral-900 border border-neutral-800"
          >
            <option value="">All Categories</option>
            <option value="Finance">Finance</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="News">News</option>
          </select>
        </div>

        {/* Featured Bots */}
        {featuredBots.length > 0 && (
          <div className="mb-8">
            <h4 className="text-2xl font-semibold mb-4">Featured Bots</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBots.map(renderBotCard)}
            </div>
          </div>
        )}

        {/* Sponsored Bots */}
        {sponsoredBots.length > 0 && (
          <div className="mb-8">
            <h4 className="text-2xl font-semibold mb-4">Sponsored Bots</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsoredBots.map(renderBotCard)}
            </div>
          </div>
        )}

        {/* Regular Bots */}
        {loading ? (
          <p className="text-center text-neutral-400">Loading bots...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map(renderBotCard)}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
