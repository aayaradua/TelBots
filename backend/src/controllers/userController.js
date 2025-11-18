import { message } from "telegram/client/index.js";
import { Bot } from "../models/Bot.js";
import { checkBot } from "../services/telegram.js";

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
        await Bot.create({
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
