const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
// @desc    Get Goals
// @route   GET api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc    Set Goal
// @route   POST api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc    Update Goal
// @route   PUT api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //Get user who's goal we have to update... this ensures that only the user can update his goal
  // const user = await User.findById(req.user.id); // we have our id stored (after decoding the token) in req.user in authMiddleware

  //Check for user
  if (!req.user) {
    res.status(401); //not authorised
    throw new Error("User not found!");
  }

  //Ensure that the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401); //not authorised
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //creates the goal if it isn't there
  });

  res.status(200).json(updatedGoal);
});

// @desc    Delete Goal
// @route   DELETE api/goals
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  console.log(goal);
  // console.log(req.params.id);
  // console.log(req.user.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  console.log(req.user);
  //Check for user
  if (!req.user) {
    res.status(401); //not authorised
    throw new Error("User not found!");
  }

  // console.log(goal.user);

  //Ensure that the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401); //not authorised
    throw new Error("User not authorized");
  }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
