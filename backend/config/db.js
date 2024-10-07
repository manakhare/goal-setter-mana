const mongoose = require("mongoose");

const connectDB = async () => {
  try {    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err);
    process.exit(1); //we exit our process with 1 if there is an error, it shows failure
  }
};

module.exports = connectDB;