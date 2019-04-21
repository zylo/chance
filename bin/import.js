#!/usr/bin/env node

const fs = require('fs');
const JSONStream = require('JSONStream');
const program = require('commander');
const logger = require('../api/helpers/logger');
const { ChargeDAO } = require('../api/daos/chargeDao');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
program
  .option('-f, --filename <required>', 'filename required')
  .version('1.1.0')
  .parse(process.argv);

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

const SAVE_BATCH_SIZE = 5000;

const getJSONFileParser = (filename) => {
  const stream = fs.createReadStream(filename, { encoding: 'utf8' });
  const parser = JSONStream.parse('*');

  stream.pipe(parser);

  return parser;
};

const importFile = (filename) => {
  if (!filename) {
    throw new Error('filename is required!');
  }

  const startTime = process.hrtime();
  const chargeDao = new ChargeDAO();

  logger.info(`Importing charges from ${filename}...`);

  // TODO: Find a better way to ensure all saves have completed.  This could be a problem for insanely large files.
  const savesToResolve = [];
  let chargesToSave = [];

  getJSONFileParser(filename).on('data', (charge) => {
    chargesToSave.push(charge);

    if (chargesToSave.length >= SAVE_BATCH_SIZE) {
      savesToResolve.push(chargeDao.save(chargesToSave));
      chargesToSave = [];
    }
  }).on('end', () => {
    if (chargesToSave.length > 0) {
      savesToResolve.push(chargeDao.save(chargesToSave));
      chargesToSave = [];
    }
    Promise.all(savesToResolve).finally(() => {
      const endTime = process.hrtime(startTime);
      logger.info(`Imported ${chargeDao.chargesSaved} charges, with ${chargeDao.chargesFailed} failures.`);
      logger.info(`Runtime: ${endTime[0]}s ${endTime[1] / 1000000}ms`);
      process.exit(0);
    });
  });
};

importFile(program.filename);
