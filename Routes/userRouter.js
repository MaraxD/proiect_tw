import express, { response } from "express"
import { User } from "../Models/user.js"
import { Notes } from "../Models/notes.js"

const userRouter=express.Router()

//get students (for testing only)
userRouter.get("/allUsers",async(req,res)=>{
    try {
        const users=await User.findAll()
        if(users.length>0){
            res.json(users)
        }else{
            res.json("there are no users in the db yet")
        }
    } catch (error) {
        res.status(404).json({"message":"smth when wrong when getting the data"})
    }
})


//adding a user to the database
userRouter.post("/addNewUser",async(req,res)=>{
    try {
        const user=await User.create(req.body)
        res.status(201).json({"message":"user created yey"})
        
    } catch (error) {
        res.status(404).json({"message":"smth went wrong"})
    }
});

//get a specific user (useful for when a user logs in and the profile should corespond with the email put in the login page)
userRouter.get("/:userId/users", async(req, res)=>{
    try {
        const findUser= await User.findByPk(req.params.userId)
        if(findUser.length>0){
            res.json(findUser)
        }else{
            res.json({"message":"for some reason this student doesn t have data"})
        }
    } catch (error) {
        res.status(404).json({"message":"couldn t find the student u re searching for"})
    }
})

//update the student s data
userRouter.put("/:userId/users",async(req,res)=>{
    try {
        const user=await user.update(req.body)
        if(user){
            return res.status(200).json({"message":"student s info has been updated"})
        }else{
            return res.status(404).json({"error":`could not find student with the id: ${req.params.userId}`})
        }

        
    } catch (error) {
        return res.status(400).json({"message":"could not update the indo"})
    }
})

//delete a student
//its noted should also be deleted sooo, first delete the notes and then the student
userRouter.delete("/:userId/users",async(req,res)=>{
    try {
        //before deleting the user i will also get its notes and delete them 
        const user=await User.findByPk(req.params.userId)
        if(user){
            await user.destroy()
            return res.status(200).json("student deleted")
        }else{
            return res.status(404).json({error:"the student doesn t exits"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
    
})

//TODO: filter the notes of a student (by title, by date created, etc)

//add a note
// var date=new Date()
//                 var dd=String(date.getDate()).padStart(2,'0')
//                 var mm=String(date.getMonth()+1).padStart(2,'0')
//                 var yyyy=date.getFullYear()
//                 date=dd+'/'+mm+'/'+yyyy
                
export {userRouter}