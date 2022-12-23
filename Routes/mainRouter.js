import express, { response } from "express"
import {sequelize} from "../sequelize.js"
import { userRouter } from "./userRouter.js"

import { User } from "../Models/user.js"
import { Note } from "../Models/note.js"

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
                const note=await Note.create(n)
                console.log(note)
                registry[n.key]=note
                //nu se insereaza notitele cum trebuie
                user.addNote(n)
            }        
            await user.save()
        }
        res.status(204).json("data has been added to the DB")
    } catch (error) {
        res.status(400).json(error)
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
            // res.json(result)
            console.log(result)
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