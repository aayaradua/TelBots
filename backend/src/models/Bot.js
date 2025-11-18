import mongoose from "mongoose";

const botSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    botUrl: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    },
    logo: {
        type: String
    },
    activeUsers: {
        type: Number
    },
    commands: [
        {
            command: String,
            description: String
        }
    ],
  
}, { timestamps: true});

export const Bot = mongoose.model("bot", botSchema);