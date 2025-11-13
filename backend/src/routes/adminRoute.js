import express from "express"
import { deleteBot, approveBots, pendingBots, addAdmin } from "../controllers/adminController.js";
import { addAdmiValidation, deleteBotValidation, approveBotsValidation } from "../validators/adminValidation.js";
import { verifyToken } from "../middlewares/userAuth.js";
import  checkRole  from "../middlewares/checkRole.js"

const router = express.Router();

router.patch("/:id", verifyToken, checkRole(), approveBotsValidation, approveBots);
router.post("/",  verifyToken, checkRole(), addAdmiValidation, addAdmin);
router.delete("/", verifyToken, checkRole(), deleteBotValidation, deleteBot);
router.get("/",  verifyToken, checkRole(), pendingBots);

export default router;