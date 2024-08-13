import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!! Something is missing",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists! plight login",
        success: false,
      });
    }

    const hasedPassword = await bcrypt.hash(password, 5);

    await User.create({
      username,
      email,
      password: hasedPassword,
    });
    return res.status(200).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
      success: false,
    });
  }
};
