import { Sequelize } from "sequelize";

const sequelize=new Sequelize({
    dialect: "sqlite",
    storage:"./sqlite/app.db"
});

sequelize.sync({alter:true}).then(()=>{
    console.log("all the models have been synchronized")
})

export {sequelize}