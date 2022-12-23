import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { Sequelize } from "sequelize"
import { mainRouter } from "./Routes/mainRouter.js"

import { User } from "./Models/user.js"
import { Note } from "./Models/note.js"
import { sequelize } from "./sequelize.js"

const app=express()

//defining the relationship between the two tables
User.hasMany(Note)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use((error,req,res,next)=>{
    console.error(`[ERROR]: ${error}`)
    res.status(500).json(error)
})

app.use("/api",mainRouter)

app.listen(8080,async()=>{
    console.log("the app is running on port 8080...")
    try {
        await sequelize.authenticate()
        console.log("connection has been established yey")
    } catch (error) {
        console.error("smth when wrong when connecting to the DB",error)
    }
})