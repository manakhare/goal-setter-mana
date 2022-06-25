const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")   //the token in the authorisation header starts with "Bearer nkfjdksjl..."
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];  //token[0] = "Bearer" && token[1] = "shkjfho...."(token)

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //decodes the token, so we can access any of its object (like id)

      //Get user from the token
      req.user = await User.findById(decoded.id).select("-passowrd"); //access id from decoded token && our user won't contain password
      next();
    } catch (error) {
      console.log(error);
      res.status(401); //Not authorised
      throw new Error("Not authorised");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

module.exports = { protect };
