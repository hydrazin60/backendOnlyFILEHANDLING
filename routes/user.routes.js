import express from "express";
import {
  getProfile,
  Login,
  Logout,
  Register,
} from "../controllers/user.controller.js";
const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/getuser/:userId", getProfile);

export default authRouter;
