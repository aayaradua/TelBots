import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const endpoints = [
  {
    name: "Check Verification",
    route: "GET /api/v1/bots/:username/verify",
    desc: "Returns verification status, trust score, metadata.",
  },
  {
    name: "Fetch Bot Profile",
    route: "GET /api/v1/bots/:username",
    desc: "Returns bot details, categories, activity signals.",
  },
  {
    name: "Trust Score Breakdown",
    route: "GET /api/v1/bots/:username/trust",
    desc: "Shows how trust was computed (auth, uptime, feedback).",
  },
  {
    name: "Safety Status",
    route: "GET /api/v1/bots/:username/safety",
    desc: "Flags scam signals, spam risk, abuse patterns.",
  },
];

const sampleCode = `
const res = await fetch(
  "https://api.bointel.dev/api/v1/bots/@WeatherProBot/verify"
);

const data = await res.json();

console.log({
  verified: data.verified,
  trustScore: data.trust.score,
  safety: data.safety.status
});
`.trim();

export default function VerificationAPI() {
  return (
    <section className="w-full bg-neutral-900 text-white py-24">
      <div className="max-w-6xl mx-auto px-4">

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Verification API Layer
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {endpoints.map((ep, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-black p-6 rounded-lg border border-neutral-700"
              >
                <p className="text-lg font-semibold">{ep.name}</p>
                <p className="text-sm text-neutral-400 mt-1">{ep.route}</p>
                <p className="text-sm text-neutral-500 mt-2">{ep.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-lg overflow-hidden border border-neutral-800"
          >
            <SyntaxHighlighter language="javascript" style={dracula}>
              {sampleCode}
            </SyntaxHighlighter>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
