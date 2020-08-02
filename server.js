/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servser running on port ${port}..`);
});