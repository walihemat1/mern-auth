import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are required!");
  }

  const user = await User.findOne({ email });

  if (user) {
    if (User.matchPasswords(enteredPassword)) {
      generateToken(res, user._userId);

      res.status(200).json({
        status: "sucess",
        mesage: "User authenticated!",
        data: { id: user._userId, name: user.name, email: user.email },
      });
    } else {
    }
  } else {
  }

  res.status(200).json({ message: "Auth User" });
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("name, email, and password are required!");
  }

  // {email: email} same as {email}
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exits!");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    // generate token
    generateToken(res, user._userId);

    res.status(201).json({
      status: "success",
      message: "User was created",
      data: { _id: user._id, name: user.name, email: user.email },
    });
  } else {
    res.status(500);
    throw new Error("User was not created!");
  }
});

// @desc    logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get user profile" });
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
