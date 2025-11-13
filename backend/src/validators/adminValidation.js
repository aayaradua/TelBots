import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";

export const addAdmiValidation = [
    body("name")
    .notEmpty()
    .isString()
    .withMessage("Name is required"),

    body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is required"),
    
    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
    
    validateRequest
];

export const approveBotsValidation = [
    body("status")
    .notEmpty()
    .isString()
    .withMessage("Name is required"),

    param("id")
    .isMongoId().withMessage("Invalid bot Id"),

    validateRequest
];

export const deleteBotValidation = [
    param("id")
    .isMongoId().withMessage("Invalid bot Id"),

    validateRequest
];