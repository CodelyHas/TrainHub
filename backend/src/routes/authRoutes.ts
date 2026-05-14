import express from "express";
import { login } from "../controllers/authController.ts";
import { validateLogin } from "../validators/authValidator.ts";
import { validationMiddleware } from "../middleware/validationMiddleware.ts";

const router = express.Router();

router.post("/login", validateLogin, validationMiddleware, login);

export default router;