const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST / api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, gender, phone, email, password } = req.body;

  if (!name || !gender || !phone || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!!");
  }

  const user = await User.create({
    name,
    gender,
    phone,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      status: 201,
      message : "User Registered Successfully !!",
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc login a user
// @route POST / api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  
  const user = await User.findOne({ email });
  const userPassword = user.password == password;

  if (user && userPassword) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid or Active");
  }
});

// @desc current user
// @route GET / api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  contacts = await User.findOne({ email: req.user.email });
  res.json(contacts);
});

module.exports = { registerUser, loginUser, currentUser };
