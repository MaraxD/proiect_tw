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
            isEmail:true,
            mailValidation(value){
                if(!value.includes("@stud.ase.ro")){
                    throw new Error("you didn t log in with the faculty email")
                }
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:[4,10],
            // isComplex(pass){
            //     if(!pass.contains("?"))
            // }
        }
    },
    phoneNr:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true,
        validate:{
            phoneValidation(number){
                if(number.length<10){
                    throw new Error("invalid phone number")
                }
            }
        }
    },
    enrlYear:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isValid(year){
                if(year<1913){
                    throw new Error("the faculty didn t exist in that time")
                }
            }
        }
    },
    finishYear:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isValid(year){
            if(year<1913){
                throw new Error("the faculty didn t exist in that time")
            }
        }}
    },
});


export {User}