/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const { static } = require("express");
const { Error } = require("mongoose");

const app = express();
// 1) global middleware
// set security HTTP headers
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// api limiting for limit the same api request from the user only the 100 request will be send to the browser after its saying too many request
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//  data sanitize against NOSql quey injection
app.use(mongoSanitize());

// serving static files XSS
app.use(xss());

// Prevent parameter pollution
// app.use(hpp());
app.use(express.static(`${__dirname}/public`));

// 1st middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  console.log(req.headers);
  next();
});

// route handler function

// routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// writing the ROUTES in better way
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
