// Update with your config settings.

module.exports = {

  development:  {
    client: 'postgresql',
    connection: {
      database: 'versionChecker',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds:{
      directory:"./db/seeds"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'versionChecker',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds:{
      directory:"./db/seeds"
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'versionChecker',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    }
  }

};
