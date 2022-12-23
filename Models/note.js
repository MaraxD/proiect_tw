import {sequelize} from "../sequelize.js"
import { DataTypes } from "sequelize"

const Note=sequelize.define("notes",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    dateCreated:{
        type:DataTypes.STRING,
        allowNull:false //the date will be automatically inserted when a new note is created
        //the user doesn t have to do anything (so don t create a date field for the front end) (fac conversie la toString)
    },
    title:{
        type:DataTypes.STRING,
        allowNull:true
    },
    content:{
        type:DataTypes.STRING,
        allowNull:true
    }


});

export {Note}