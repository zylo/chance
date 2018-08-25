#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { Pool } = require('pg')
const format = require('pg-format');

program
  .option('-f, --filename <required>', 'filename required')
  .version('1.1.0')
  .parse(process.argv);

const logger = require('../api/helpers/logger');

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

// Confirm the file flag was entered
const chargeFile = program.filename; // Turn this on for testing: || 'temp/charges.json
if (!chargeFile) {
  logger.error('a filename is required with flag -f');
  process.exit(1);
}

// Loading in the data
const fileData = fs.readFileSync(chargeFile);  
const jsonDataArray = JSON.parse(fileData);

// appending a UUID to the data
const uuidv4 = require('uuid/v4');
jsonDataArray.map(charge => charge["id"] = uuidv4());

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'zylo_chance',
  password: 'password',
  port: 54321
});

// Generate the query 
const formattedData = jsonDataArray.map(datum => Object.values(datum));
const query = format('INSERT INTO charges(amount,date,name,description,type,id) Values %L', formattedData);

// Execute the query 
pool.query(query)
  .then(queryResult => {
    console.log(queryResult)
    // we end the process because of successful insertion
    process.exit(0)
  })
  .catch(err => console.error('Unexpected Error', err));
