import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  //const { user } = useAppContext();
  const user = null

  const handleCick = (event) => {
    event.preventDefault();
    if (user) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  };

  const sampleCode = `
fetch("https://api.bointel.dev/v1/bots/verify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    bot_username: "@examplebot",
    owner_id: "129302939",
  }),
});
  `.trim();

  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto py-24 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-bold leading-tight"
          >
            Automated Intelligence for Every Telegram Bot
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-4 text-neutral-400 text-lg"
          >
            Ingest. Analyze. Verify. Rank. The infrastructure layer for bots.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-8"
          >
            <Link 
            onClick={handleCick}
            className="bg-white text-black px-6 py-3 rounded-md text-sm font-semibold">
              Add your Bot
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg overflow-hidden border border-neutral-800"
        >
          <SyntaxHighlighter language="javascript" style={dracula}>
            {sampleCode}
          </SyntaxHighlighter>
        </motion.div>

      </div>
    </section>
  );
}
