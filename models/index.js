const Sequelize = require("sequelize");
const db = require("../config/db");
const UserModel = require("./user");

const User = UserModel(db, Sequelize);

module.exports = {
  User,
  connection: db,
};
