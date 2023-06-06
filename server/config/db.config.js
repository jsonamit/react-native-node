const {Sequelize, DataTypes} = require("sequelize");

const dbConfig = require("./db.constant");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



// force: true  means drop existing tables and re-sync database

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// Models
db.users = require("../models/users")(sequelize, DataTypes);

db.sequelize.sync()
  .then(() => {
    // console.log("Synced db.");
    console.log('-------------> Connected Database <------------------');
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

module.exports = db;  