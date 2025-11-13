import { Admin } from "../models/Admin.js";
import { Bot } from "../models/Bot.js";
import { hashPassword } from "../utils/bcrypt.js";

export const addAdmin = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const  existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({error: "Admin already exist!"})
        }
        const hashedPassword = await hashPassword(password);

        await Admin.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            status: "Success",
            message: "Admin is added successfully"
        });
    } catch(err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};

export const pendingBots = async(req, res) => {
    try {
        const bots = await Bot.find({ status: "pending" });

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
}

export const approveBots = async(req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        await Bot.findByIdAndUpdate(id, {status}, {new: true});

         return res.status(200).json({
            status: "Success",
            message: "Bot has been approve"
        });
    } catch(err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};

export const deleteBot = async(req, res) => {
    const { id } = req.params;
    try {
        await Bot.findByIdAndDelete(id);

         return res.status(200).json({
            status: "Success",
            message: "Bot has been deleted successfully"
        });
    } catch(err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};