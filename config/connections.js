module.exports = {
  postgres_test: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_TEST_DB
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    }
  },
  postgres: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    }
  },
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: './test/storage/test.sqlite'
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    }
  }
};

