import express from "express";
import { ENV } from "./config/index.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import botRoute from "./routes/botRoute.js"
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js"
import verificatuinRoute from "./routes/verificationRoute.js"
import billingRoute from "./routes/billingRoute.js"
import webhookRoute from "./routes/webhookRoute.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
/*import "./utils/basicAnalytics.js";
import "./utils/proAnalytics.js";
import "./utils/enterpriceAnalytics.js"*/

connectDB();

const PORT = ENV.PORT;
const app = express();

app.use(express.json());
app.use(cors({
    origin: `${ENV.FRONTEND_URL}`,
    credentials: true
}));
app.use(cookieParser());
app.use("/webhook", bodyParser.raw({ type: "application/json" }), webhookRoute);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/bot", botRoute);
app.use("/api/v1/billing", billingRoute);
app.use("/api/v1/verification", verificatuinRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});