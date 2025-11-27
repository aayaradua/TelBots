import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-800 bg-black">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-white text-xl font-semibold"
        >
          BotIntel
        </motion.h1>

        <nav className="flex items-center gap-6 text-neutral-300 text-sm">
          <Link to="/bots">Bots</Link>
          <Link to="/directory" className="hover:text-yellow-500">All Bots</Link>
          <Link to="/pricing" className="hover:text-yellow-500">Pricing</Link>
          <Link to="/verify">Verify</Link>
          <Link to="/ranking">Ranking</Link>
          <Link to="/docs">Docs</Link>
        </nav>
      </div>
    </header>
  );
}
