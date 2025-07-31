require("dotenv").config(); // make sure to load .env

module.exports = {
  development: {
    username: "postgres",
    password: "hardik",
    database: "messenger_sequelize",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // important for Railway
      },
    },
  },
};
