require('dotenv').config();

module.exports = {
  url: process.env.DATABASE_URL, // optional if using full URL
  HOST: "localhost",
  USER: "your_db_user",
  PASSWORD: "your_password",
  DB: "your_database_name",
  dialect: "mysql", // or 'postgres', 'sqlite', etc.
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};