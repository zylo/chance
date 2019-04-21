#!/usr/bin/env node


const program = require('commander');
const logger = require('../api/helpers/logger');

const { ChargesFileReader } = require('../src/ChargesFileReader');
const { ChargeDAO } = require('../api/daos/chargeDao');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

const importFile = (filename) => {
  if (!filename) {
    throw new Error('filename is required!');
  }

  const startTime = process.hrtime();
  const chargeDao = new ChargeDAO();

  logger.info(`Importing charges from ${filename}...`);

  // TODO: Find a better way to ensure all saves have completed.  This could be a problem for insanely large files.
  const savesToResolve = [];

  new ChargesFileReader(filename)
    .read()
    .on('data', charges => savesToResolve.push(chargeDao.save(charges)))
    .on('end', () => {
      Promise.all(savesToResolve).finally(() => {
        const endTime = process.hrtime(startTime);

        logger.info(`Imported ${chargeDao.chargesSaved} charges, with ${chargeDao.chargesFailed} failures.`);
        logger.info(`Runtime: ${endTime[0]}s ${endTime[1] / 1000000}ms`);

        process.exit(0);
      });
    });
};

program
  .option('-f, --filename <required>', 'filename required')
  .version('1.1.0')
  .parse(process.argv);

importFile(program.filename);
