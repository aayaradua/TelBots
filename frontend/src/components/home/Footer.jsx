import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-neutral-400 py-16 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-white font-bold text-lg mb-4">Bointel</p>
          <p className="text-sm">
            Verification, intelligence, ranking, and analytics for Telegram bots.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="text-white font-semibold mb-4 text-sm">Product</p>
          <ul className="space-y-2 text-sm">
            <li>Verification</li>
            <li>Promotion</li>
            <li>Analytics</li>
            <li>Reputation</li>
            <li>Category Intelligence</li>
            <li>Advertising</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-white font-semibold mb-4 text-sm">Developers</p>
          <ul className="space-y-2 text-sm">
            <li>REST API</li>
            <li>Verification API</li>
            <li>Webhooks</li>
            <li>SDK</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-white font-semibold mb-4 text-sm">Company</p>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Contact</li>
          </ul>
        </motion.div>

      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 border-t border-neutral-800 pt-6 text-sm text-neutral-500">
        © {new Date().getFullYear()} Bointel. All rights reserved.
      </div>
    </footer>
  );
}
