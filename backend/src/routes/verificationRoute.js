import express from "express";
import { topBots, sponsoredBots, featuredBots, confirmBot, fetchAll } from "../controllers/botController.js";
import { addBotValidation } from "../validators/userValidation.js";

const router = express.Router();

router.get("/top", topBots);
router.get("/sponsored", sponsoredBots);
router.post("/featured", featuredBots);
router.post("/confirm-bot", confirmBot);
router.get("/", fetchAll);

export default router;