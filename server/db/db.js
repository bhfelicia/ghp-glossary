const Sequelize = require("sequelize");
require("dotenv").config();

const config = { logging: false };

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/GHP_Glossary",
  config
);

module.exports = db;
