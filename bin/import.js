#!/usr/bin/env node

const fs = require('fs');
const JSONStream = require('JSONStream');
const program = require('commander');
const logger = require('../api/helpers/logger');
const { ChargeImporter } = require('../api/helpers/chargeImporter');

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

const importFile = (filename) => {
  if (!filename) {
    throw new Error('filename is required!');
  }

  const importer = new ChargeImporter();

  logger.info(`Importing charges from ${filename}...`);

  const stream = fs.createReadStream(filename, { encoding: 'utf8' });
  const parser = JSONStream.parse('*');

  stream.pipe(parser);
  const hrstart = process.hrtime();

  const savesToResolve = []; // TODO: This could be a problem for insanely large files.
  let chargesToSave = [];

  parser.on('data', (charge) => {
    chargesToSave.push(charge);
    if (chargesToSave.length >= SAVE_BATCH_SIZE) {
      savesToResolve.push(importer.saveCharge(chargesToSave));
      chargesToSave = [];
    }
  }).on('end', () => {
    if (chargesToSave.length > 0) {
      savesToResolve.push(importer.saveCharge(chargesToSave));
      chargesToSave = [];
    }
    Promise.all(savesToResolve).finally(() => {
      const hrend = process.hrtime(hrstart);
      logger.info(`Imported ${importer.chargesSaved} charges, with ${importer.chargesFailed} failures.`);
      logger.info(`Runtime: ${hrend[0]}s ${hrend[1] / 1000000}ms`);
      process.exit(0);
    });
  });
};

importFile(program.filename);
