/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() =>
    // console.log(con.connections);
    console.log("DB connection successful!")
  )
  .catch((err) => console.log("ERROR"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}..`);
});
