const { sendResponse, AppError } = require("./helpers/utils");
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

// Connect to MONGODB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, () => {
  console.log("Connected to Database!");
});

app.use((req, res, next) => {
	const err = new AppError(404, "Not Found", "Bad Request");
	next(err);
  });
  app.use((err, req, res, next) => {
	console.log("ERROR", err);
	return sendResponse(
	  res,
	  err.statusCode ? err.statusCode : 500,
	  false,
	  null,
	  { message: err.message },
	  err.isOperational ? err.errorType : "Internal Server Error"
	);
  });
  
module.exports = app;
