const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.get("/", (req, res) => {
  res.send("Hi from backend!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// We do "react run build" -- which creates a static html file, that will be the entrypoint of our react frontend
// Serve frontend
// if ((process.env.NODE_ENV = "production")) {
//   // Set the static folder --- react build folder
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   // We now want the index.html file that is in the build folder
//   // We want to point all the routes (except the api routes above), to the index.html
//   // Uploads the index.html file that is in our static build folder
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) =>
//     res.send("Please set node environment to production!")
//   );
// }

app.use(errorHandler); //this overrides the default Express error handling

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
