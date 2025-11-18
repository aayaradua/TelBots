import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const heading = "TelBots — Discover Telegram Bots";
const sub = "Search, browse and access bots by category, functionality, or popularity.";

const letterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, type: "spring", stiffness: 120 }
  })
};

export default function TelBotsHero() {
  return (
    <section className="w-full bg-[#0088cc] text-white"> 
      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12">

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1
            aria-label={heading}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            initial="hidden"
            animate="visible"
          >
            {heading.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className={char === " " ? "inline-block w-2" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 text-sm md:text-base max-w-xl mx-auto lg:mx-0 text-white/90"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-md mx-auto lg:mx-0"
          >
            <div className="flex gap-3">
              <input
                aria-label="Search bots"
                className="flex-1 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none"
                placeholder="Search bots, eg. file converter, ai chat"
              />
              <button className="px-4 py-3 rounded-xl bg-white text-[#0088cc] font-semibold">Search</button>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-white/80">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full">AI</span>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full">Productivity</span>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full">Utilities</span>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full">Entertainment</span>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="w-[340px] sm:w-[380px] md:w-[420px] bg-white rounded-3xl p-4 shadow-2xl border border-white/20 text-slate-900"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-[#0088cc] rounded-full flex items-center justify-center text-white font-bold">TB</div>
                <div>
                  <div className="font-semibold">File Converter</div>
                  <div className="text-xs text-slate-500">Utilities · 120K users</div>
                </div>
              </div>

              <div className="space-y-3">
                {[{
                  title: "Convert images to PDF",
                  description: "Upload images and get a single PDF file"
                }, {
                  title: "Compress video",
                  description: "Reduce video size without losing quality"
                }, {
                  title: "Extract audio",
                  description: "Get MP3 from video or voice messages"
                }].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06 }}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
                <div>Last updated · 3 days ago</div>
                <button className="px-3 py-1 rounded-md bg-[#0088cc] text-white text-sm">Open</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
