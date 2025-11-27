import express from "express";
import { topBots, sponsoredBots, featuredBots, submitBot, confirmBot, getBot, fetchAll, visitBot } from "../controllers/botController.js";
import { addBotValidation } from "../validators/userValidation.js";
import { trackCountry } from "../middlewares/trackCountry.js";

const router = express.Router();

router.get("/top", topBots);
router.get("/sponsored", sponsoredBots);
router.post("/featured", featuredBots);
router.post("/submit", submitBot )
router.post("/confirm-bot", confirmBot);
router.get("/r/:id", visitBot);
router.get("/:id", trackCountry, getBot);
router.get("/", fetchAll);

export default router;