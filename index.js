const express = require("express");
const morgan = require("morgan");
const app = express();
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// 1) MIDDLEWARES
//We are using express.json() method to parse incoming request with JSON Payload.
app.use(express.json());

//Here we are creating our own middleware
//This routes apply over every request
app.use((req, res, next) => {
  console.log("Hello From Middleware");
  next();
});

//Here we are creating middleware to get the time when request is initiated.
//This routes apply over every request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//This is third party miidleware to log.
//This routes apply over every request

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//ROUTES
//This middleware only apply to the tour and user routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
