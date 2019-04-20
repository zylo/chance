const connections = require('./config/connections');

module.exports = {
  development: connections.postgres,
  test: connections.postgres_test,
  production: {}
};
