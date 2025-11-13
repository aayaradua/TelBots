import express from "express";
import { submitBot, confirmBot, fetchAll } from "../controllers/userController.js";
import { addBotValidation } from "../validators/userValidation.js";

const router = express.Router();

router.post("/submit-bot", submitBot);
router.post("/confirm-bot", confirmBot);
router.get("/", fetchAll);

export default router;