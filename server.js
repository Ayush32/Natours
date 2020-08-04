/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servser running on port ${port}..`);
});