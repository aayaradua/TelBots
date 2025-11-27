import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const categories = [
  { name: "Finance", growth: "↑ 23%", demand: "High" },
  { name: "Education", growth: "↑ 15%", demand: "Medium" },
  { name: "Health", growth: "↑ 30%", demand: "High" },
  { name: "Travel", growth: "↑ 8%", demand: "Low" },
  { name: "E-Commerce", growth: "↑ 20%", demand: "High" },
];

const sampleCategoryAPI = `
fetch("https://api.bointel.dev/v1/categories/insights")
  .then(res => res.json())
  .then(data => console.log(data));
`.trim();

export default function CategoryIntelligence() {
  return (
    <section className="w-full bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Category List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-8">Category Intelligence</h3>
          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 flex justify-between"
              >
                <span className="font-semibold">{cat.name}</span>
                <span className="text-neutral-400">{cat.growth} | {cat.demand}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-lg overflow-hidden border border-neutral-800"
        >
          <SyntaxHighlighter language="javascript" style={dracula}>
            {sampleCategoryAPI}
          </SyntaxHighlighter>
        </motion.div>

      </div>
    </section>
  );
}
