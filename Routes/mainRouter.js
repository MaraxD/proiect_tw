import express, { response } from "express"
import {sequelize} from "../sequelize.js"
import { userRouter } from "./userRouter.js"

import { User } from "../Models/user.js"
import { Notes } from "../Models/notes.js"

const router=express.Router()

router.use("/users",userRouter)

router.put("/createDB",async(req,res)=>{
    try {
        await sequelize.sync({force:true})
        res.json("db created")
    } catch (error) {
        res.status(400).json("could not create db")
        
    }
})

router.post("/data",async(req,res)=>{
    try {
        const registry={}
        for(let u of req.body){
            const user= await User.create(u)
            for(let n of u.notes){
                const note=await Notes.create(n)
                registry[n.key]=note
                user.addNotes(n)
            }        
            await user.save()
        }
        res.status(204).json("data has been added to the DB")
    } catch (error) {
        res.status(400).json("could not insert data into DB")
    }
})

router.get("/data",async(res,req,next)=>{
    try {
        const result=[]
        for(let u of await User.findAll()){
            const user={
                id:u.id,
                firstName:u.firstName,
                lastName:u.lastName,
                email:u.email,
                password:u.password,
                phoneNr:u.phoneNr,
                enrlYear:u.enrlYear,
                finishYear:u.finishYear,
                notes:[]
            }
            for(let n of await u.getNotes()){
                user.notes.push({
                    key:n.id,
                    dateCreated:n.dateCreated,
                    title:n.title,
                    content:n.content
                })
            }
            result.push(user)
        }
        if(result.length>0){
            res.json(result)
        }else{
            console.log("there s no data in the DB")
            //res.json("there s no data in the DB") dc nu merge???
        }
    } catch (error) {
        next(error)
        res.statusCode(400).json("could not get data from DB")
    }
})


export {router as mainRouter}