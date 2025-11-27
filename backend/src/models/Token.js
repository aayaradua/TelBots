import mongoose from "mongoose";

const tokenSchema =new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    jti: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    isUsed: {
        type: Boolean,
        required: true,
        default: false
    },
     token: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export const Token = mongoose.model("token", tokenSchema);