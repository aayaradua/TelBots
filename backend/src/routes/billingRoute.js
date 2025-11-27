import express from "express";
import { checkout } from "../controllers/billingController.js";
import { verifyToken } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/checkout", verifyToken, checkout);

export default router;
