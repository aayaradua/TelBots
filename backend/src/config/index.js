import dotenv from "dotenv"
dotenv.config();

export const ENV = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    API_ID: process.env.API_ID,
    API_HASH: process.env.API_HASH
}