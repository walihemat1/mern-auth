import jwt from "jsonwebtoken";

// to generate a token, we need two things: response and userId

// the way jsonwebtoken works is we can add something to the payload and for that we can use the userId to add it to the payload, and the reason we need it is to valid the token if it is valid
const generateToken = async (res, userId) => {
  // 1) create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // 2) we need to save in a cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
