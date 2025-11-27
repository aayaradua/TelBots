import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const analyticsData = [
  { title: "Weekly Active Bots", value: "1,243" },
  { title: "Total Verifications", value: "532" },
  { title: "Average Trust Score", value: "87%" },
];

const sampleAPIUsage = `
fetch("https://api.bointel.dev/v1/bots/stats", {
  headers: { Authorization: "Bearer <API_KEY>" }
}).then(res => res.json())
  .then(data => console.log(data));
`.trim();

export default function AnalyticsPreview() {
  return (
    <section className="w-full bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-8">Bot Analytics Snapshot</h3>
          <div className="space-y-6">
            {analyticsData.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-neutral-900 p-6 rounded-lg border border-neutral-800"
              >
                <p className="text-neutral-400 text-sm">{metric.title}</p>
                <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API / Code Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-lg overflow-hidden border border-neutral-800"
        >
          <SyntaxHighlighter language="javascript" style={dracula}>
            {sampleAPIUsage}
          </SyntaxHighlighter>
        </motion.div>

      </div>
    </section>
  );
}
