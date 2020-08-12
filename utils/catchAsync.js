/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
