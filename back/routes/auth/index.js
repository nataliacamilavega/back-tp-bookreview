import express from "express";
import { login, register } from "../../controllers/authController.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("imageLink"), register);
router.post("/login", login);

export default router;
