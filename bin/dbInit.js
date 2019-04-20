#!/usr/bin/env node

'use strict';

process.env.NODE_ENV = 'development';

const knex = require('knex');
const fs = require('fs');

const { defaultConnection } = require('../config/config');
const logger = require('../api/helpers/logger');

const DDL_PATH = `${process.cwd()}/db/ddl.sql`;

const readDDLFile = () => {
  let ddlSql = null;

  try {
    logger.info(`Reading DDL from: ${DDL_PATH}`);

    ddlSql = fs.readFileSync(DDL_PATH).toString();
  } catch (err) {
    logger.error(err);
  }

  return ddlSql;
};

const dbInit = async () => {
  logger.log('Initializing DB...');

  const ddlSql = readDDLFile();
  logger.info(`Connecting to ${process.env.POSTGRES_DB}...`);
  try {
    const db = knex(defaultConnection);
    await db.raw(ddlSql);
    logger.info('DDL successfully created.');
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
};

dbInit();
