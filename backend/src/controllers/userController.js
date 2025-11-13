import { message } from "telegram/client/index.js";
import { Bot } from "../models/Bot.js";
import { checkBot } from "../services/telegram.js";

export const addBot = async(req, res) => {
    const { username } = req.body;
    try {
        const existingBot = await Bot.findOne({ username });
        if (existingBot) {
            return res.status(400).json({error: "Bot already exist!"});
        } 
        const bot = await checkBot(username);
        console.log("Bot result", bot);

        return res.status(201).json({
            status: "Success",
            message: "Bot is added successfully"
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
    try {
        await Bot.create({})
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
            message: "Bots fetched successfully",
            data: bots
        });
    } catch(err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};
