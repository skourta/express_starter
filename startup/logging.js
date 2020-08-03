import winston from "winston";
const { combine, colorize, simple, json } = winston.format;
// require('winston-mongodb');
import "express-async-errors";

export default function () {
  const myFormat = combine(colorize(), simple());
  winston.configure({
    format: myFormat,
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
      }),
      new winston.transports.File({
        filename: "uncaughtExceptions.log",
        handleExceptions: true,
      }),
    ],
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });
}
