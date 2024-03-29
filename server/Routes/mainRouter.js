import express, { response } from "express"
import {sequelize} from "../sequelize.js"
import { userRouter } from "./userRouter.js"

import { User } from "../Models/user.js"
import { Note } from "../Models/note.js"
import { Folder } from "../Models/folder.js"

const router=express.Router()

router.use("/users",userRouter)

router.put("/createDB",async(req,res)=>{
    try {
        await sequelize.sync({force:true})
        res.status(200).json({"message":"db created"})
    } catch (error) {
        res.status(400).json({"message":"could not create db"})
        
    }
})

router.post("/data",async(req,res)=>{
    try {
        const registry={}
        for(let u of req.body){
            const user= await User.create(u)
            for(let n of u.notes){
                const note=await Note.create(n)
                registry[n.key]=note
                user.addNote(note)
            }   
            
            for(let f of u.folders){
                const folder=await Folder.create(f)
                registry[f.key]=folder
                //nu se insereaza notitele in folder
                for(let n2 of f.notes){
                    const note2=await Note.create(n2)
                    registry[n2.key]=note2
                    folder.addNote(note2)
                }
                user.addFolder(folder)
            }
            await user.save()
        }
        res.status(204).json({"message":"data has been added to the DB"})
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/data",async(req,res,next)=>{
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
                notes:[],
                folders:[]
            }
            for(let n of await u.getNotes()){
                user.notes.push({
                    key:n.id,
                    dateCreated:n.dateCreated,
                    title:n.title,
                    content:n.content
                })
            }

            for(let f of await u.getFolders()){
                const folder={
                    key:f.id,
                    nameFolder:f.nameFolder,
                    notes:[]
                }
                for(let n2 of await f.getNotes()){
                    folder.notes.push({
                        key:n2.id,
                        dateCreated:n2.dateCreated,
                        title:n2.title,
                        content:n2.content
                    })
                }
                user.folders.push(folder)
            }
            result.push(user)
        }
        if(result.length>0){
            res.json(result)
        }else{
            res.status(204).json({"message":"there s no data in the DB"}) 
        }
    } catch (error) {
        res.status(400).json({"message":"could not get data from DB"})
    }
})



export {router as mainRouter}