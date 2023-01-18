import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineFile, AiFillFolderOpen, AiFillPlusCircle } from "react-icons/ai"
import {CiSaveDown2 } from "react-icons/ci"
import {FiShare } from "react-icons/fi"

import './mainPage.css'

const server="http://localhost:8080"

function MainPage(){ //props.data
    const[notes,setNotes]=useState([{}])
    const[folders,setFolders]=useState([{}]) //trebuie sa vad ce returneaza

    const[state,setState]=useState({query:'',list:[]})
    const[stateC,setStateC]=useState('') //state ul pentru click buton
    const[stateN,setStateN]=useState('') //state ul pentru notita
    const[stateF,setStateF]=useState('') //state ul pentru folder
    const[stateD,setStateD]=useState('') //state ul pentru click div
    const[load,setLoad]=useState('') //state ul pentru preluare imagini and stuff


    const[newElem,setElem]=useState({})
    const[nameF, setNameF]=useState('Untitled')
    //din nou, nu stiu daca e chiar facut asa sau se putea mai usor
    const[nameN, setNameN]=useState('')
    const[contentN, setContentN]=useState('')
    const[idN, setIdN]=useState(0)


    const navigate=useNavigate()

   

    //OPERATIILE PENTRU NOTES
    const getNotes=async()=>{
        //again id ul nu trebuie sa fie hardcodat
        const res=await fetch(`${server}/api/users/da067d2c-6306-4bce-b93a-bfb3ef831fb1/notes`)
        const data=await res.json()
        setNotes(data)

        const res2=await fetch(`${server}/api/users/da067d2c-6306-4bce-b93a-bfb3ef831fb1/folders`)
        const data2=await res2.json()
        setFolders(data2)
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
        const res=await fetch(`${server}/api/users/${idN}/notes/da067d2c-6306-4bce-b93a-bfb3ef831fb1`,
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
        if(notes===null){
            return(
                <div className='note'>No notes to show here </div>
            )
        }else{
            return notes.map((e)=>{
                return(
                    <div className='note' onClick={getSelectedNote}>{e.title}</div>
                )
            })
        }
        
    }

    // const editNote=async()=>{

    //     const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/notes`,
    //     {
    //         method:'PUT',
    //         headers:{
    //             "Content-type":"application/json"
    //         },body:JSON.stringify(newElem)
    //     })
    //     .then(console.log("note added into db"))
    //     getNotes()
    // }


    //adds a note to db
    const addNote=async()=>{
        const res=await fetch(`${server}/api/users/da067d2c-6306-4bce-b93a-bfb3ef831fb1/notes`,
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
        const res=await fetch(`${server}/api/users/${idN}/notes/da067d2c-6306-4bce-b93a-bfb3ef831fb1`,
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

    const handleClickF=(e)=>{
        setStateF('clicked')
    }

    const toAccount=()=>{
        navigate('/userPage')
    }

    const editName=event=>{
        setNameF(event.target.value)
    }

    const openFolder=()=>{

    }

    //OPERATIILE PENTRU FOLDERS
    //trebuie testat
    const getFolders=async()=>{
        const res=await fetch(`${server}/api/users/da067d2c-6306-4bce-b93a-bfb3ef831fb1/folders`)
        const data=await res.json()
        setFolders(data)
    }

    //TODO: de rezolvat aici
    const showFolders=async()=>{
        return(
            folders.map((e)=>{
                <div class="folder-item"><AiFillFolderOpen/>{ e.nameFolder}</div>
            })
        )
    }

    const addFolder=()=>{
        return(
            <div className='newFolder'>
                <li class="menu-item" onClick={openFolder}><AiFillFolderOpen/> New Untitled Folder</li>
                {/* <input className='nameFolder' type="text" value={nameF} onChange={editName}/> */}
            </div>
        )
    }


    useEffect(()=>{
        getNotes()
    },[])

    useEffect(()=>{
        getFolders()
    },[])

   

    return(
        <div className="mainPage">
            
            <div className="container">
            <nav>
                <ul>
                    <li><a href="#" class="logo"><img src="logo.jpg" alt=""/><span class="nav-item">Ase Notes</span></a></li>
                    <li class="menu-item" onClick={toAccount}><FaUserCircle/> Cont Personal</li>
                    <li class="menu-item" onClick={handleClick}><AiOutlineFile/>Notes</li>
                    <li class="menu-item"><AiFillFolderOpen/> Folder</li>
                    <li class="edit-item"><BsFillPencilFill/> Edit</li>
                    <li class="add-item" onClick={handleClickF}><AiFillPlusCircle/> Add Folder</li>
                   
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

                            

                        {/* <input type="notes1" placeholder="Notes 1"/>           
                        <input type="notes2" placeholder="Notes 2"/>   
                        <input type="notes3" placeholder="Notes 3"/>  */}
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
                    </ul>
                </nav3>
            </div>
        </div>
    )
}

export default MainPage