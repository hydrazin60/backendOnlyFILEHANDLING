import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/user.routes.js";
import { Fileerrorhandler } from "./middlewares/Fileerrorhandling.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use("/testbackend/api/v1/user", authRouter);
app.use(Fileerrorhandler)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Database connected `);
  })
  .catch((err) => {
    console.log(err);
  });
