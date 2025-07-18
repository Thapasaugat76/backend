const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig");

// Create Sequelize instance
const sequelize = dbConfig.url
  ? new Sequelize(dbConfig.url, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    })
  : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    });

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });

// Initialize DB object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require("./usersModel")(sequelize, DataTypes);
db.blogs = require("./blogModel")(sequelize, DataTypes);

// Define associations
db.users.hasMany(db.blogs, { foreignKey: "userId" });
db.blogs.belongsTo(db.users, { foreignKey: "userId" });

// Sync models
db.sequelize.sync({ force: false }).then(() => {
  console.log("✅ Models synced");
});

module.exports = db;
