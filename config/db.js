const Sequelize = require("sequelize");

const sequelize = new Sequelize("oauth_test", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
