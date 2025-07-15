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

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      status: "sucess",
      mesage: "User authenticated!",
      data: { id: user._userId, name: user.name, email: user.email },
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }
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
    generateToken(res, user._id);

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
  res.cookie("jwt", "", {
    httpOnly: true,
    // new Date(0) means it expires right away
    expires: new Date(0),
  });

  res.status(200).json({ status: "success", message: "User logged out!" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json({
    status: "success",
    message: "User found!",
    data: user,
  });
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      message: "User updated!",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("User was not updated!");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
