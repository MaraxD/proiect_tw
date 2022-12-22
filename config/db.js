const Sequelize = require("sequelize");

const sequelize = new Sequelize("oauth_training", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
