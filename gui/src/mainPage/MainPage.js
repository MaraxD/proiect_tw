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
    const[stateN,setStateN]=useState('') //state ul pentru click buton
    const[stateF,setStateF]=useState('') //state ul pentru click buton
    let[stateD,setStateD]=useState('') //state ul pentru click div

    const[newElem,setElem]=useState({})
    const[nameF, setNameF]=useState('Untitled')

    const navigate=useNavigate()

    //OPERATIILE PENTRU NOTES
    const getNotes=async()=>{
        //again id ul nu trebuie sa fie hardcodat
        const res=await fetch(`${server}/api/users/274f383e-97e1-4ae1-90f3-07818592c98b/notes`)
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

    const handleClickD=()=>{
        stateD='click'
        setStateD(stateD)
    }

    const showSelectedNote=(e)=>{
            let noteFound=notes.find(elem=>elem.title===e.target.innerHTML)
            console.log(stateD)
            return(
                <div>
                    {/* <button className='delete'>Delete</button> */}
                    <input type='text' value={noteFound.title}/>
                    <input type='text' value={noteFound.content}/>
                    {/* <button className='save'>Save</button> */}
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
                    <div className='note' onClick={handleClickD}>{e.title}</div>
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

        const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/notes`,
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
            newElem.dateCreated='05/01/2023'


            setElem(newElem)
            addNote()
            document.getElementsByClassName('title')[0].value=''
            document.getElementsByClassName('noteC')[0].value=''

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
        const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/folders`)
        const data=await res.json()
        setFolders(data)
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
                    {stateF===''?"":addFolder()}
                </ul>
            </nav>
            </div>

            <div className="search">
                <nav1>
                    <ul>
                        <input type="text" placeholder="Search.." onChange={handleChange}/>                         
                        {state.query===''?addDiv():state.list.map(note=>{
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
                        
                    </ul>
                </nav2>
            </div>
            <div class="buttons">
                <nav3>
                    <ul>
                        <li class="trash"><BsFillTrashFill/></li>
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