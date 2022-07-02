const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //to hash our passwords && it deals with async methods
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Goal = require("../models/goalModel");

// @desc    Register user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400); //bad request
    throw new Error("Please add all fields");
  }

  //Check if user exits
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); //bad request
    throw new Error(`User ${name} already exists. Please use another email`);
  }

  //Hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //this gives us the hashed password

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Find user -- check for user email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Email is not registered. Kindly register first.");
  }

  //Match password
  //Since our password is now hashed, we need to use a bcrypt method .compare(curr password, hashed password in our user module) and compare if they match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }

  //   res.json({ message: "Login user" });
});

// @desc    Get user data
// @route   GET api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user); //We get the user data from req.user
  // const { _id, name, email } = await User.findById(req.user.id); //Since it goes through protect function first, we can now access id from req.user

  // res.status(200).json({
  //   id: _id,
  //   name,
  //   email,
  // });
  //   res.json({ message: "Display user data" });
});

const deleteUser = asyncHandler(async (req, res) => {
  await Goal.deleteMany({ user : req.user.id });
  await User.findByIdAndDelete(req.user.id);

  res.json({ message: "User deleted" });
});

//Generate token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //.sign({payload on which we generate token}, jwt-secret, how many days after it will expire)
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  deleteUser,
};
