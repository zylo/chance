'use strict';

const winston = require('winston');

const loggingLevel = 'debug';
const logFile = './logs/all-logs.log';
const fs = require('fs');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      level: loggingLevel,
      filename: logFile,
      handleExceptions: process.env.NODE_ENV !== 'test',
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: true
    }),
    new winston.transports.Console({
      level: loggingLevel,
      handleExceptions: process.env.NODE_ENV !== 'test',
      json: false,
      colorize: true,
      timestamp: true
    })],
  exitOnError: process.env.NODE_ENV === 'test'
});

module.exports = logger;
