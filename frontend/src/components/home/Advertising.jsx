import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const adSlots = [
  {
    label: "Trending List Slot",
    desc: "Placed at top of weekly trending.",
    tag: "PROMOTED",
  },
  {
    label: "Category Page Slot",
    desc: "Pinned inside high-traffic categories.",
    tag: "SPONSORED",
  },
  {
    label: "Search Results Slot",
    desc: "Inserted above organic results.",
    tag: "AD",
  },
];

const sampleAdAPI = `
await fetch("https://api.bointel.dev/ads/request", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    bot: "@ShopSmartBot",
    slot: "search_results",
    duration: 7
  })
});
`.trim();

export default function Advertising() {
  return (
    <section className="w-full bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Advertising Layer
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {adSlots.map((slot, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-neutral-900 p-6 rounded-lg border border-neutral-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-semibold">{slot.label}</p>
                  <span className="text-xs px-2 py-1 rounded bg-yellow-500 text-black font-bold">
                    {slot.tag}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm">{slot.desc}</p>
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
              {sampleAdAPI}
            </SyntaxHighlighter>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
