// import express from "express";
// import {
//   editProfile,
//   getProfile,
//   Login,
//   Logout,
//   Register,
// } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthentication.js";
// import upload from "../middlewares/multer.js";
// const authRouter = express.Router();

// authRouter.post("/register", Register);
// authRouter.post("/login", Login);
// authRouter.get("/logout", Logout);
// authRouter.get("/getuser/:userId", getProfile);
// authRouter.post(
//   "/edituser/:userId",
//   upload.single("profilePic"),
//   upload.single("coverPic"),
//   isAuthenticated,
//   editProfile
// );

// export default authRouter;

import express from "express";
import upload from "../middlewares/multer.js";
import {
  editProfile,
  getProfile,
  Login,
  Logout,
  Register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/getuser/:userId", getProfile);
authRouter.post(
  "/edituser",
  upload.fields([{ name: "profilePic" }, { name: "coverPic" }]), // Updated to handle multiple files
  isAuthenticated,
  editProfile
);

export default authRouter;
