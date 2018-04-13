#!/usr/bin/env node

const program = require('commander');

program
  .option('-f, --filename <required>', 'filename required')
  .version('1.1.0')
  .parse(process.argv);

const logger = require('../api/helpers/logger');

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

// TODO import file to database
// const chargeFile = program.filename;

process.exit(0);
