import { Sequelize } from "sequelize";

const sequelize=new Sequelize({
    dialect: "sqlite",
    storage:"./sqlite/app.db"
});

export {sequelize}