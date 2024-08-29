"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require(__dirname + "/../config/config");
require("dotenv").config();
const db = {};

//Extract the database information into an array
let sequelize, core;
let databaseCore = config.core;

core = new Sequelize(
  databaseCore.database,
  databaseCore.username,
  databaseCore.password,
  databaseCore
);

/**Add the Database Models**/
//Add models from database1 folder
fs.readdirSync(__dirname + "/core")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname + "/core", file))(
      core,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.core = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
