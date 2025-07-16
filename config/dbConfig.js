// config.js
module.exports = {
   url: process.env.MYSQL_PUBLIC_URL,
   dialect: "mysql",
   pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000,
   },
 };