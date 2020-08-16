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
const { static } = require("express");
const { Error } = require("mongoose");

const app = express();
// 1) global middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60* 1000
})

app.use(express.json());
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
