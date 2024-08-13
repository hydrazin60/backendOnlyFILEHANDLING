import express from "express";
import { Register } from "../controllers/user.controller.js";
const authRouter = express.Router();

authRouter.post("/register", Register);

export default authRouter;
