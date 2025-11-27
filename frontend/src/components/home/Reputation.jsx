import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const reviews = [
  {
    bot: "@WeatherProBot",
    user: "Alice",
    rating: 5,
    comment: "Accurate and fast weather updates. Highly recommended!",
  },
  {
    bot: "@CryptoAlertsBot",
    user: "Bob",
    rating: 4,
    comment: "Great bot for crypto alerts. Could improve notification speed.",
  },
  {
    bot: "@NewsDigestBot",
    user: "Charlie",
    rating: 5,
    comment: "Daily news summary keeps me updated efficiently.",
  },
];

export default function Reputation() {
  const sampleTrustScoreCode = `
fetch("https://api.bointel.dev/v1/bots/trust?username=@WeatherProBot")
  .then(res => res.json())
  .then(data => console.log(data.trustScore));
  `.trim();

  return (
    <section className="w-full bg-neutral-900 text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Reputation & Feedback
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-black p-6 rounded-lg border border-neutral-700"
              >
                <p className="font-semibold">{review.user} on {review.bot}</p>
                <p className="text-yellow-400 mt-1">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </p>
                <p className="text-neutral-400 mt-2 text-sm">{review.comment}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Score API Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-lg overflow-hidden border border-neutral-800"
          >
            <SyntaxHighlighter language="javascript" style={dracula}>
              {sampleTrustScoreCode}
            </SyntaxHighlighter>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
