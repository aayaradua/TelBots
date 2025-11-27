import express from "express"
import { verifyToken } from "../middlewares/userAuth.js";
import { signUp, login, getProfile, forgotPassword, resetPassword, logout } from "../controllers/authController.js";
import { loginValidation, forgotPasswordValidation, resetPasswordValidation } from "../validators/authValidation.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", loginValidation, login);
router.get("/me", verifyToken, getProfile);
router.post("/forgot", forgotPasswordValidation, forgotPassword);
router.post("/reset", resetPasswordValidation, resetPassword);
router.post("/logout", logout);

export default router;