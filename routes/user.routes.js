import express from "express";
import { Login, Register } from "../controllers/user.controller.js";
const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);

export default authRouter;
