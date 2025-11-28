import { message } from "telegram/client/index.js";
import { Bot } from "../models/Bot.js";
import { checkBot } from "../services/telegram.js";
import { User } from "../models/User.js";

export const submitBot = async(req, res) => {
    const { username } = req.body;
    try {
        const existingBot = await Bot.findOne({ username });
        if (existingBot) {
            return res.status(400).json({error: "Bot already exist!"});
        } 
        const botData = await checkBot(username);
        console.log("Bot result", botData);

        const cleanedCommands = (botData.commands).map(c => ({
            command: c.command,
            description: c.description
        }));

        const cleanedBotData = {
            name:botData.name,
            username: botData.username,
            botUrl: `https://t.me/${botData.username}`,
            description: botData.description,
            logo: botData.profilePhoto,
            activeUsers: botData.activeUsers,
            commands: cleanedCommands   
        };
        
        return res.status(201).json({
            status: "Success",
            message: "Bot data has been fetched.",
            bot: cleanedBotData
        });

    } catch(err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};

export const confirmBot = async(req, res) => {
    const { botData, category, subCategory } = req.body;

    const cleanedCommands = (botData.commands).map(c => ({
        command: c.command,
        description: c.description
    }));

    try {
      const bot =  await Bot.create({
            userId: req.user?.userId,
            name:botData.name,
            username: botData.username,
            botUrl: `https://t.me/${botData.username}`,
            description: botData.description,
            category: category,
            subCategory: subCategory,
            logo: botData.profilePhoto,
            activeUsers: botData.activeUsers,
            commands: cleanedCommands   
        });

        await User.updateOne({ _id: req.user?.userI}, {
            $set: { botId: bot._id }
        });
    } catch (err) {
        return res.status(500).json({
            status: "Failed", 
            message: err.message
        });
    }
}

export const fetchAll = async(req, res) => {
    try {
        const bots = await Bot.find();

        for (let bot of bots) {
            bot.impressions += 1;
            await bot.save();
        };

        return res.status(200).json({
            status: "Success",
            message: "Bots fetched successfully.",
            data: bots
        });
    } catch(err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};

export const topBots = async(req, res) => {
    try {
        const bots = await Bot.find({isTopBot: true});

         for (let bot of bots) {
            bot.impressions += 1;
            await bot.save();
        };

        return res.status(200).json({
            status: "Success",
            message: "Top bots have been fetched.",
            data: bots
        });
    } catch (err) {
         return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};


export const sponsoredBots = async(req, res) => {
    try {
        const bots = await Bot.find({isSponsored: true});

         for (let bot of bots) {
            bot.impressions += 1;
            await bot.save();
        };

        return res.status(200).json({
            status: "Success",
            message: "Sponsored bots have been fetched.",
            data: bots
        });
    } catch (err) {
         return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};

export const visitBot =  async (req, res) => {
    try {
        const bot = await Bot.findById(req.params.id);
        if (!bot) return res.status(404).json({ message: "Bot not found" });
         
        bot.clicks += 1;
        bot.dailyClicks += 1;

        await bot.save();

        return res.redirect(bot.botUrl);
    } catch (err) {
         return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};

export const getBot = async (req, res) => {
  try {
       const bot = await Bot.findById(req.params.id);
       if (!bot) return res.status(404).json({ message: "Bot not found" });
       bot.visits += 1;
       await bot.save();

       return res.status(200).json({
            status: "Success",
            message: "Featured bots have been fetched.",
            data: bot
        });
    } catch (err) {
         return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};


export const featuredBots = async(req, res) => {
    try {
        const bots = await Bot.find({isFeatured: true});

         for (let bot of bots) {
            bot.impressions += 1;
            await bot.save();
        };
        
        return res.status(200).json({
            status: "Success",
            message: "Featured bots have been fetched.",
            data: bots
        });
    } catch (err) {
         return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};
