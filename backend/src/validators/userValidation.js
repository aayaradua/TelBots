import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";

export const addBotValidation = [
    body("name")
    .notEmpty()
    .isString()
    .withMessage("Name is required"),

    body("username")
    .notEmpty()
    .isString()
    .withMessage("Usename is required"),

    body("description")
    .notEmpty()
    .isString()
    .withMessage("Description is required"),

    body("category")
    .notEmpty()
    .isString()
    .withMessage("Category is required"),

    body("commands")
    .notEmpty()
    .withMessage("Commands are required"),


    validateRequest
];