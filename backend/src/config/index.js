import dotenv from "dotenv"
dotenv.config();

export const ENV = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    API_ID: process.env.API_ID,
    API_HASH: process.env.API_HASH,
    FRONTEND_URL: process.env.FRONTEND_URL,
    PRICE_STARTER_ID: process.env.PRICE_STARTER_ID,
    PRICE_PRO_ID: process.env.PRICE_PRO_ID,
    PRICE_ENTERPRISE_ID: process.env.PRICE_ENTERPRISE_ID,
}