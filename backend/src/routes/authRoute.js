import express from "express"
import { loginAdmin, forgotPassword, resetPassword, logoutAdmin } from "../controllers/authController.js";
import { loginValidation, forgotPasswordValidation, resetPasswordValidation } from "../validators/authValidation.js";
const router = express.Router();

router.post("/login", loginValidation, loginAdmin);
router.post("/forgot", forgotPasswordValidation, forgotPassword);
router.post("/reset", resetPasswordValidation, resetPassword);
router.post("/logout", logoutAdmin);

export default router;