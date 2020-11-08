const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const app = express();

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

// using the express middleware to parse incoming data from browser to json format
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DataBase connected sucessfully.");
});

const port = 5000;

//diresting every user method to the router/home.js using middleware
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server Started");
});
