const winston = require("winston");
//require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({
      filename: "unhandledExceptions.log"
    })
  );

  process.on("unhandledRejection", ex => {
    // console.log("Unhandled Rejection");
    // winston.error("ex.message", ex);
    // process.exit(1);
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logFile.log" });
  // winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });
};
