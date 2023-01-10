import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Folder=sequelize.define("folders",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    nameFolder:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export{Folder}