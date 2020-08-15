/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) create  a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // ACTIVATE N GMAIL "LESS SECURE APP" OPTION
  });

  // 2)  define the email address
  const mailOptions = {
    from: "Ayush Gupta <ayush@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3)  actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
