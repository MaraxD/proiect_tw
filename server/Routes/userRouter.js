import express, { response } from "express"
import { User } from "../Models/user.js"
import { Note } from "../Models/note.js"
import { Folder } from "../Models/folder.js"

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
userRouter.get("/:userId/users", async(req, res)=>{
    try {
        const findUser= await User.findByPk(req.params.userId)
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
userRouter.put("/:userId/users",async(req,res)=>{
    try {
        const user= await User.findByPk(req.params.userId)
        const userM=user.shift()
        if(userM){
            await userM.update(req.body)
            return res.status(204).json({"message":"student s info has been updated"})
        }else{
            return res.status(404).json({"message":`could not find student with the id: ${req.params.userId}`})
        }

        
    } catch (error) {
        return res.status(400).json({"message":"could not update the info"})
    }
})

//delete a student
userRouter.delete("/:userId/users",async(req,res)=>{
    try {
        //before deleting the user i will also get its notes and delete them 
        const user= await User.findByPk(req.params.userId)
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




//http://localhost:8080/api/users/68c814e0-2e9b-466a-bed4-5c493a6ce11b/folders
// get all the folders (pt afisare pe pagina)
userRouter.get("/:userId/folders",async(req,res)=>{
    try {
        const result=[]
        const user=await User.findByPk(req.params.userId)
        if(user){
            const folders=await user.getFolders()
            for(let f of folders){
                const folder={
                    id:f.id,
                    nameFolder:f.nameFolder,
                    notes:[]
                }
                for(let n of await f.getNotes()){
                    folder.notes.push({
                        key:n.id,
                        dateCreated:n.dateCreated,
                        title:n.title,
                        content:n.content
                    })
                }
                result.push(folder)
            }

        }else{
            res.status(404).json({"message":"there s no user with that id"})
        }
        if(result.length>0){
            res.json(result)
        }else{
            res.status(204).json({"message":"there are no folders in DB for this user"})
        }
    } catch (error) {
        res.status(400).json({"message":"smth went wrong when getting the folders"})
    }
})

//add a folder
userRouter.post("/:userId/folders",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const folder=await Folder.create(req.body)
            user.addFolder(folder)
            await user.save()
            res.status(201).location(folder.id).send()
        }else{
            res.status(404).json({"message":"could not find the user"})
        }
    } catch (error) {
        res.status(400).json({"message":"smth went wrong when creating a folder"})
    }
})

//edit the name of the folder MERGE
userRouter.put("/:idFolder/users/:userId",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const folder=await user.getFolders({where:{id:req.params.idFolder}})
            const folderS=folder.shift()
            if(folderS){
                folderS.update(req.body)
                return res.status(204).json({"message":"title of the folder updated with success"})
            }else{
                return res.status(404).json({"message":"folder with that id could not be found"})
            }
        }else{                    
            return res.status(404).json({"message":"user with that id doesn t exist"})
        }
    } catch (error) {
        return res.status(404).json({"message":"smth went wrong when updating the name of this folder"})
    }
})

//delete the folder MERGE
userRouter.delete("/:idFolder/users/:userId",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const folder=await user.getFolders({where:{id:req.params.idFolder}})
            const folderS=folder.shift()
            if(folderS){
                folderS.destroy()
                return res.status(204).json({"message":"folder deleted with success"})
            }else{
                return res.status(204).json({"message":"folder with that id could not be found"})
            }
        }else{                    
            return res.status(404).json({"message":"user with that id doesn t exist"})
        }
    } catch (error) {
        return res.status(404).json({"message":"smth went wrong when deleting the folder"})
    }
})


//edit the content of a selected folder (add a note, delete a note, update a note)
//add notes into a folder
userRouter.post("/:idFolder/users/:userId",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const folder=await Folder.findByPk(req.params.idFolder)
            if(folder){
                //crearea si inserarea notitelor
                const note=await Note.create(req.body)
                folder.addNote(note)
                await folder.save()
                return res.status(204).location(note.id).send()
            }else{
                return res.status(404).json({"message":"folder with that id could not be found"})
            }
        }else{
            return res.status(404).json({"message":"user with that id could not be found"}) 
        }
    } catch (error) {
        return res.status(404).json({"message":"smth went wrong when inserting a note in the folder"})

    }
})


//edit
userRouter.put("/:idFolder/users/:userId/notes/:noteId",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const folder=await user.getFolders({where:{id:req.params.idFolder}})
            const folderS=folder.shift()
            if(folderS){
                const note=await folderS.getNotes({where:{id:req.params.noteId}})
                const noteS=note.shift()
                if(noteS){
                    await noteS.update(req.body)
                    return res.status(204).json({"message":"updated with success"})
                }else{
                    return res.status(404).json({"message":"note with that id doesn t exist"})
                }
            }else{
                return res.status(404).json({"message":"folder with that id doesn t exist"})
            }
        }else{                    
            return res.status(404).json({"message":"user with that id doesn t exist"})
        }
    } catch (error) {
        return res.status(404).json({"message":"smth went wrong when updating the note inside this folder"})
    }
})


//delete a note from a folder
userRouter.delete("/:idFolder/users/:userId/notes/:noteId",async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.userId)
        if(user){
            const folder=await Folder.findByPk()
            const folderS=folder.shift()
            if(folderS){
                const note=await Note.findByPk(req.params.noteId)
                const noteS=note.shift()
                if(noteS){
                    await noteS.destroy()
                    return res.status(204).json({"message":"deleted with success"})
                }else{
                    return res.status(404).json({"message":"note with that id doesn t exist"})
                }
            }else{
                return res.status(404).json({"message":"folder with that id doesn t exist"})
            }
        }else{                    
            return res.status(404).json({"message":"user with that id doesn t exist"})
        }
    } catch (error) {
        return res.status(404).json({"message":"smth went wrong when deleting the note inside this folder"})
    }
})
                
export {userRouter}