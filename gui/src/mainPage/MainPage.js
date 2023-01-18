import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineFile, AiFillFolderOpen, AiFillPlusCircle } from "react-icons/ai"
import {CiSaveDown2 } from "react-icons/ci"
import {FiShare } from "react-icons/fi"
import logo from './logo.png'

import './mainPage.css'

const server="http://localhost:8080"
const user="9c9722a8-82c9-47ca-83d8-2bc445a945a3"

function MainPage(){ //props.data
    const[notes,setNotes]=useState([{}])
    const[folders,setFolders]=useState([{}]) //trebuie sa vad ce returneaza

    const[state,setState]=useState({query:'',list:[]})
    const[stateC,setStateC]=useState('') //state ul pentru click buton
    const[stateN,setStateN]=useState('') //state ul pentru notita
    const[stateNS,setStateNS]=useState([{}]) //state ul pentru notitele din folder

    const[stateF,setStateF]=useState('') //state ul pentru folder
    const[stateD,setStateD]=useState('') //state ul pentru click div
    const[load,setLoad]=useState('') //state ul pentru preluare imagini and stuff


    const[newElem,setElem]=useState({})
    const[newF,setNewF]=useState({})
    const[exitF,setExitF]=useState('')
    const[nameF, setNameF]=useState('Untitled folder')
    //din nou, nu stiu daca e chiar facut asa sau se putea mai usor
    const[nameN, setNameN]=useState('')
    const[contentN, setContentN]=useState('')
    const[idN, setIdN]=useState(0)


    const navigate=useNavigate()

   

    //OPERATIILE PENTRU NOTES
    const getNotes=async()=>{
        //again id ul nu trebuie sa fie hardcodat
        const res=await fetch(`${server}/api/users/${user}/notes`)
        const data=await res.json()
        setNotes(data)
    }


    //pentru luarea materialelor media  
    // const getMedia=async()=>{
    //     const res=await fetch("https://photos.app.goo.gl/FCD8pK8hZEtESrs2A",
    //     {
    //         headers:{
    //             'mode':'no-cors'
    //         }
    //     })
    //     const data=await res.json()
    //     console.log(data)
    // }


    const getSelectedNote=(e)=>{
        setStateD('click')
        let noteFound=notes.find(elem=>elem.title===e.target.innerHTML)
        setNameN(noteFound.title)
        setContentN(noteFound.content)
        setIdN(noteFound.id)

    }

    const editData=(e)=>{
        if(e.target.className==="title"){
            setNameN(e.target.value)
        }else if(e.target.className==="content"){
            setContentN(e.target.value)
        }
    }

    const updateNote=()=>{
        notes.map((e)=>{
            if(e.id===idN){
                e.content=contentN
                e.title=nameN
                updateNoteDB(e)
            }
        })

        setStateD('')

        
    }

    const updateNoteDB=async(updatedElem)=>{
        const res=await fetch(`${server}/api/users/${idN}/notes/${user}`,
        {
            method:'PUT',
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify(updatedElem)
        })
        .then(console.log("note updated into db"))
        getNotes()
    }

    const showSelectedNote=()=>{
            return(
                <div>
                    <input className='title' type='text' value={nameN} onChange={editData}/>
                    <input className='content' type='text' value={contentN} onChange={editData}/>
                    <button className='save' onClick={updateNote}>Update note</button>
                </div>
            ) 
        
    }

    //pentru afisarea notitelor din BD
    const addDiv=()=>{
        if(notes.length===null){
            return(
                <div className='note'>The user doesn't have any notes </div>
            )
        }else{
            return notes.map((e)=>{
                return(
                    <div className='note' onClick={getSelectedNote}>{e.title}</div>
                )
            })
        }
        
    }

    //adds a note to db
    const addNote=async()=>{
        const res=await fetch(`${server}/api/users/${user}/notes`,
        {
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify(newElem)
        })
        .then(console.log("note added into db"))
        getNotes()
    }


    //created a note before inserting into the db
    const newNote=(e)=>{

        let titlu=document.getElementsByClassName('title')[0].value,
            continut=document.getElementsByClassName('noteC')[0].value

        newElem.title=titlu
        newElem.content=continut
        newElem.dateCreated='05/01/2023' //aici de schimbat

        setElem(newElem)
        addNote()
        document.getElementsByClassName('title')[0].value=''
        document.getElementsByClassName('noteC')[0].value=''

        setStateN('')

    }

    
    //adds the inputs when the user want to create a new note
    const addEditableDiv=()=>{
        return (
            <div>
                <input className='title' type="text" placeholder='Title..' />
                <input className='noteC' type="text" placeholder='Lorem ipsum..'/>
                {/* <input type='file' className='upload'/>
                <img className='uploadImg' src={document.getElementsByClassName('upload')[0].value}/> */}
                <button onClick={newNote}>Save note</button>
            </div>
            
        )
    }

    const deleteNote=()=>{
        deleteNoteDB(idN)
        notes.map((e)=>{
            if(e.id===idN){
                const index=notes.indexOf(e)
                notes.splice(index,1)
            }
        })
        setStateD('')
    }

    const deleteNoteDB=async(idN)=>{
        const res=await fetch(`${server}/api/users/${idN}/notes/${user}`,
        {
            method:'DELETE'
        })
        .then(console.log("note deleted from db"))
        getNotes()
    }

    //handleChange for the searchbar
    const handleChange=(e)=>{
        const results=notes.filter(note=>{
            if(e.target.value===""){
                return notes
            }else{
                return note.title.toLowerCase().includes(e.target.value.toLowerCase())
            }    
        })
        
        setState({query: e.target.value, list:results}) //every time the user types in the search bar, the state is updated
    }

    const handleClick=(e)=>{
        setStateC('clicked')
    }
    
    const handleClickN=(e)=>{
        setStateN('clicked')
    }

    const toAccount=()=>{
        navigate('/userPage')
    }

   

    //OPERATIILE PENTRU FOLDERS
    //trebuie testat
    const getFolders=async()=>{
        const res=await fetch(`${server}/api/users/${user}/folders`)
        const data=await res.json()
        console.log(data)
        setFolders(data)
    }

    
    const showFolders=()=>{
            return folders.map((e)=>{
                return(
                    <div>
                        <li class="menu-item"><AiFillFolderOpen/>
                            <li onClick={openFolder}>{e.nameFolder}</li>
                        
                        </li>
                        {stateF==='opened'? showDBtn():""}
                    </div>
                    
                )
            })
    }

    //selected note FROM the folder
    const getSelectedNoteF=(e)=>{
        setStateD('clickN')
        let noteFound=notes.find(elem=>elem.title===e.target.innerHTML)
        setNameN(noteFound.title)
        setContentN(noteFound.content)
        setIdN(noteFound.id)

    }

    const addDivF=()=>{
        if(stateNS.length===0){
            return(
                <div className='note'>There are no notes in this folder </div>
            )
        }else{
            return stateNS.map((e)=>{
                return(
                    <div className='note' onClick={getSelectedNoteF}>{e.title}</div>
                )
            })
        }
        
    }


    const deleteFolder=()=>{
       
        folders.map((e)=>{
            if(e.nameFolder===nameF){ 
                deleteFolderDB(e.id)
                const index=folders.indexOf(e)
                folders.splice(index,1)
            }
        })
        setStateF('')
    }

    const deleteFolderDB=async(idF)=>{
        const res=await fetch(`${server}/api/users/${idF}/users/${user}`,
        {
            method:'DELETE'
        })
        .then(console.log("folder deleted from db"))
        getNotes()
    }
    
    const showDBtn=()=>{
        return(
            <li class="edit-item" onClick={deleteFolder}><BsFillPencilFill/> Delete {nameF}</li>
        )
    }

    const openFolder=(e)=>{
        console.log(e.target.innerHTML)
        setNameF(e.target.innerHTML)
        setStateF('opened')
        let folderFound=folders.find(folder=>folder.nameFolder===e.target.innerHTML)
        console.log(folderFound)
        setStateNS(folderFound.notes) //state notes (NS)

    }

    const handleF=()=>{
        setStateF('createdF')
    }

    const addFolderDB=async()=>{
        const res=await fetch(`${server}/api/users/${user}/folders`,
        {
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify(newF)
        })
        .then(console.log("folder added into db"))
        getFolders()
    }

    const editNameF=(e)=>{
        setNameF(e.target.value)
        //create the folder
        newF.nameFolder=e.target.value
        newF.notes=[]
        setNewF(newF)
    }

    const addFolder=()=>{
        return(
                <li class="menu-item"><AiFillFolderOpen/> 
                    <input className='nameFolder' type="text" value={nameF} onChange={editNameF} onKeyDown={(e)=>{if(e.key==='Enter'){addFolderDB(); setStateF('')} }}/>
                </li>
        )

        
    }


    useEffect(()=>{
        getNotes()
        getFolders()
    },[])

  


    return(
        <div className="mainPage">
            
            <div className="container">
                <nav>
                    <ul>
                        <li><a class="logo"><img src={logo} alt=""/><span class="nav-item">Ase Notes</span></a></li>
                        <li class="menu-item" onClick={handleClick}><AiOutlineFile/>Notes</li>
                        {showFolders()}
                        {stateF==='createdF'?addFolder():""}
                        <li class="add-item" onClick={handleF}><AiFillPlusCircle/> Add Folder</li>
                        

                    </ul>
                </nav>
            </div>

            <div className="search">
                <nav1>
                    <ul>
                        <input type="text" placeholder="Search.." onChange={handleChange}/>                         
                        {stateC===''?"":state.query===''?addDiv():state.list.map(note=>{
                            return <div>{note.title}</div>
                        })}

                        {stateF===''?"":addDivF()}
                    </ul>
                </nav1>     
            </div>

            <div class="write">
                <nav2>
                    <ul>
                        {stateN===''?"":addEditableDiv()}
                        {stateD===''?"":showSelectedNote()}
                        
                    </ul>
                </nav2>
            </div>
            <div class="buttons">
                <nav3>
                    <ul>
                        <li class="trash" onClick={deleteNote}><BsFillTrashFill/></li>
                        <li class="save"><CiSaveDown2/></li>
                        <li class="share"><FiShare/></li>
                        <li class="plus" onClick={handleClickN}><AiFillPlusCircle/></li>   
                        <li class="account" onClick={toAccount}><FaUserCircle/></li>

                    </ul>
                </nav3>
            </div>
        </div>
    )
}

export default MainPage