import geoip from "geoip-lite";

export const trackCountry = async (req, res, next) => {
  const botId = req.params.id;
  if (!botId) return next();

  const bot = await Bot.findById(botId);
  if (!bot) return next();

  const ip = req.headers["x-forwarded-for"] || req.ip;
  const country = geoip.lookup(ip)?.country || "Unknown";

  bot.countryStats.set(country, (bot.countryStats.get(country) || 0) + 1);

  // Recalculate top country
  const entries = [...bot.countryStats.entries()];
  entries.sort((a, b) => b[1] - a[1]);
  bot.topCountry = entries[0][0];

  await bot.save();
  next();
};
