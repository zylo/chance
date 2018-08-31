#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { Pool } = require('pg');
const format = require('pg-format');

const logger = require('../api/helpers/logger');

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

/**
 * Loads and parses charge data file
 *
 * @param {string | null | undefined} fileName
 */
function loadImportFile(fileName) {
  let chargeFile;
  if (!fileName) {
    program
      .option('-f, --filename <required>', 'filename required')
      .version('1.1.0')
      .parse(process.argv);
    chargeFile = program.filename; // Can turn this on for testing: || 'temp/charges.json
  } else {
    chargeFile = fileName;
  }
  // Confirm the file flag was entered or fileName is not null
  if (!chargeFile) {
    logger.error('a filename is required with flag -f');
    process.exit(1);
  }
  // Loading in the data from the file
  try {
    const fileData = fs.readFileSync(chargeFile);
    return JSON.parse(fileData);
  } catch (error) {
    return null;
  }
}

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'zylo_chance',
  password: 'password',
  port: 54321
});

const uuidv4 = require('uuid/v4');

/**
 * Appends a UUID to each charge:
 * Bug in node-postgres, omitting UUID threw exception
 *
 * @param {Array<charge>} jsonArray
 */
function formatData(jsonArray) {
  const formattedData = jsonArray.map((charge) => {
    const updatedCharge = charge;
    updatedCharge.id = uuidv4(); // appending a UUID to the data
    return Object.values(updatedCharge); // return values as (values, ...) to be consumed by psql
  });
  return formattedData;
}

/**
 * Generates a query from a set of charge data that include UUIDs
 *
 * @param {Array<charge>} formattedData
 */
function generateQueryString(formattedData) {
  const query = format('INSERT INTO charges(amount,date,name,description,type,id) Values %L', formattedData);
  return query;
}

/**
 * The main entry point into the file
 */
function run() {
  const fileData = loadImportFile();
  const formattedData = formatData(fileData);
  const query = generateQueryString(formattedData);
  // Execute the query
  pool.query(query)
    .then((queryResult) => {
      logger.info(queryResult);
      // we end the process because of successful insertion
      process.exit(0);
    })
    .catch((err) => {
      logger.error('Unexpected Error', err);
      // we end the process because of an error
      process.exit(1);
    });
}

/**
 * Commented out for testing
 * Uncomment this to be able to execute file
 */
// run();

/**
 * Exposed functions for testing
 */
module.exports = {
  loadImportFile: loadImportFile,
  formatData: formatData,
  generateQueryString: generateQueryString,
  run: run
};
