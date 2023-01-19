import {sequelize} from "../sequelize.js"
import { DataTypes } from "sequelize"

const User=sequelize.define("user",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:[4,10]
        }
    },
    phoneNr:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true,
        validate:{
            len:[10]
        }
    },
    enrlYear:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    finishYear:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
});


export {User}