import express from "express";
import { ENV } from "./config/index.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js"
import adminRoute from "./routes/adminRoute.js"

connectDB();

const PORT = ENV.PORT;
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});