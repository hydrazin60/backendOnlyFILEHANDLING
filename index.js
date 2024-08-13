import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/user.routes.js";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));


app.use("/testbackend/api/v1/user",  authRouter )


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/filehandling")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
