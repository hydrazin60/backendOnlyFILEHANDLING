import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { response } from "express";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

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

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!! Something is missing",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Password! Please try again",
        success: false,
      });
    }

    const userData = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      profilePic: existingUser.profilePic,
      coverPic: existingUser.coverPic,
      bio: existingUser.bio,
      gender: existingUser.gender,
      followers: existingUser.followers,
      following: existingUser.following,
      posts: existingUser.posts,
      bookmarks: existingUser.bookmarks,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };

    const Token = await jwt.sign(
      { userId: existingUser._id, useremail: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "360d" }
    );

    return res
      .cookie("token", Token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 360 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Hello  ${userData.username}  Welcome to learnBackend !!`,
        success: true,
        user: userData,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error,
      success: false,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token"),
      {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 360 * 24 * 60 * 60 * 1000,
      };
    return res.status(200).json({
      message: `User  logged out successfully`,
      success: true,
    });
  } catch (error) {
    console.log("Logout Error is ", error.message);
    res.status(500).json({
      message: error,
      success: false,
      error: true,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User found successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error,
      success: false,
      error: true,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { username, bio, gender  } = req.body;
    const { profilePic, coverPic } = req.files || {}; // Use fallback to an empty object
    let cloudResponse;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (profilePic && profilePic[0]) {
      const profilePicUri = getDatauri(profilePic[0]);
      cloudResponse = await cloudinary.uploader.upload(profilePicUri);
      console.log(profilePicUri);
      user.profilePic = cloudResponse.secure_url;
    }

    if (coverPic && coverPic[0]) {
      const coverPicUri = getDatauri(coverPic[0]);
      cloudResponse = await cloudinary.uploader.upload(coverPicUri);
      console.log(coverPicUri);
      user.coverPic = cloudResponse.secure_url;
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (username) user.username = username;

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
