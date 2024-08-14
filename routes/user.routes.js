import express from "express";
import {
  editProfile,
  getProfile,
  Login,
  Logout,
  Register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import upload from "../middlewares/multer.js";
const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/getuser/:userId", getProfile);
authRouter.post(
  "/edituser/:userId",
  upload.single("profilePic"),
  upload.single("coverPic"),
  isAuthenticated,
  editProfile
);

export default authRouter;
