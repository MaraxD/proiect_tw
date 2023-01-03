import express, { response } from "express"
import { User } from "../Models/user.js"
import { Note } from "../Models/note.js"

const userRouter=express.Router()

//get students (for testing only)
//http://localhost:8080/api/users/allUsers
userRouter.get("/allUsers",async(req,res)=>{
    try {
        const users=await User.findAll()
        if(users.length>0){
            res.json(users)
        }else{
            res.json({"message":"there are no users in the db yet"})
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
userRouter.get("/:userEmail/users", async(req, res)=>{
    try {
        const findUser= await User.findAll({where:{email: req.params.userEmail}})
        if(findUser){
            res.json(findUser)
        }else{
            res.status(204).json({"message":"for some reason this student doesn t have data"})
        }
    } catch (error) {
        res.status(404).json({"message":"couldn t find the student u re searching for"})
    }
})

//update the student s data
userRouter.put("/:userEmail/users",async(req,res)=>{
    try {
        const user= await User.findAll({where:{email: req.params.userEmail}})
        const userM=user.shift()
        if(userM){
            await userM.update(req.body)
            return res.status(204).json({"message":"student s info has been updated"})
        }else{
            return res.status(404).json({"message":`could not find student with the id: ${req.params.userEmail}`})
        }

        
    } catch (error) {
        return res.status(400).json({"message":"could not update the info"})
    }
})

//delete a student
userRouter.delete("/:userEmail/users",async(req,res)=>{
    try {
        //before deleting the user i will also get its notes and delete them 
        const user= await User.findAll({where:{email: req.params.userEmail}})
        const userM=user.shift()
        if(userM){
            await userM.destroy()
            return res.status(200).json({"message":"student deleted"})
        }else{
            return res.status(404).json({"message":"the student doesn t exist"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
    
})

//get the notes of a certain student
userRouter.get("/:userId/notes",async(req,res)=>{
    try {
        const student=await User.findByPk(req.params.userId)
        if(student){
            const notes=await student.getNotes()
            if(notes.length>0){
                res.json(notes)
            }else{
                res.status(204).json({"message":"this student doesn t have any notes"})         
            }
        }else{
            res.status(404).json({"message":"this student doesn t have any notes"})         
        }
    } catch (error) {
        res.status(400).json({"message":"smth when wrong when getting the notes of that student"})
    }
})


//add a note
//mai intai vezi care e id ul studentului care vrea sa adauge o notita
userRouter.post("/:userId/notes",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const note=await Note.create(req.body)
            user.addNote(note)
            await user.save()
            res.status(201).location(note.id).send()
        }else{
            res.sendStatus(404)
        }
    } catch (error) {
        res.status(400).json({"message":"smth went wrong when adding a note"})
    }
})

//update a certain note
userRouter.put("/:noteId/notes/:userId",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const notes=await user.getNotes({where: {id:req.params.noteId}})
            const note=notes.shift()
            if(note){
                await note.update(req.body)
                return res.status(204).json({"message":"updated with success"})
            }else{
                return res.status(404).json({"message":"note with that id doesn t exist"})

            }
        }
    } catch (error) {
        return res.status(400).json({"message":"smth went wrong when updating the note"})
    }
})


//delete a certain note
userRouter.delete("/:noteId/notes/:userId",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const notes=await user.getNotes({where: {id:req.params.noteId}})
            const note=notes.shift()
            if(note){
                await note.destroy()
                return res.status(204).json({"message":"deleted with success"})
            }else{
                return res.status(404).json({"message":"note with that id doesn t exist"})

            }
        }
    } catch (error) {
        return res.status(400).json({"message":"smth went wrong when deleting the note"})
    }
})

// var date=new Date()
//                 var dd=String(date.getDate()).padStart(2,'0')
//                 var mm=String(date.getMonth()+1).padStart(2,'0')
//                 var yyyy=date.getFullYear()
//                 date=dd+'/'+mm+'/'+yyyy

//filter the notes of a student (by title, by date created, etc)

                
export {userRouter}