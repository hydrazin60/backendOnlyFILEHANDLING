import express from "express";
import { Login, Logout, Register } from "../controllers/user.controller.js";
const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);

export default authRouter;
