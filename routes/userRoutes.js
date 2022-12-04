import express, {Router }from "express";
import { registerUser } from "../controllers/user/regController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route('/').post(registerUser);

export default router;