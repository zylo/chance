const convict = require('convict');
const databaseSettings = require('./connections');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'PORT',
    arg: 'port'
  },
  database: {
    doc: 'The database connection to use.',
    format: Object.keys(databaseSettings),
    default: 'postgres',
    env: 'DB_CONNECTION',
    arg: 'db'
  },
  batchSize: {
    doc: 'Max number of insert statements to run in a single batch.',
    format: 'int',
    default: 1000
  }
});

const env = config.get('env');

config.loadFile(`${__dirname}/env/${env}.json`);
config.validate({ allowed: 'strict' });

const defaultConnection = databaseSettings[config.get('database')];
module.exports = { config: config, defaultConnection: defaultConnection, connections: databaseSettings };
