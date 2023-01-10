import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//e nevoie de acesta pt elementul Link
import { Link } from "react-router-dom";

import './mainPage.css'

const server="http://localhost:8080"

function MainPage(){
    const[notes,setNotes]=useState([{}])
    const[state,setState]=useState({query:'',list:[]})
    const[stateC,setStateC]=useState('') //state ul pentru click buton
    let[stateD,setStateD]=useState('') //state ul pentru click div
    const[newElem,setElem]=useState({})

    const navigate=useNavigate()

    const getNotes=async()=>{
        //again id ul nu trebuie sa fie hardcodat
        const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/notes`)
        const data=await res.json()
        console.log(data)
        setNotes(data)
    }

    const handleClickD=()=>{
        stateD='click'
        setStateD(stateD)
    }

    const showNote=(e)=>{
            let noteFound=notes.find(elem=>elem.title===e.target.innerHTML)
            console.log(stateD)
            return(
                <div>
                    <button className='delete'>Delete</button>
                    <input type='text' value={noteFound.title}/>
                    <input type='text' value={noteFound.content}/>
                    
                    <button className='save'>Save</button>
                </div>
            ) 
        
    }

    const addDiv=()=>{
        return notes.map((e)=>{
            return(
                <div className='note' onClick={handleClickD}>{e.title}</div>
                
            )
        })
    }

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

    const handleChange=(e)=>{
        const results=notes.filter(note=>{
            if(e.target.value===""){
                return notes
            }else{
                return note.title.toLowerCase().includes(e.target.value.toLowerCase())
            }    
        })
        
        setState({query: e.target.value, list:results}) //every time the use types in the search bar, the state is updated
    }

    const handleClick=(e)=>{
        setStateC('clicked')
    }

    const toAccount=()=>{
        navigate('/userPage')
    }

    const addFolder=()=>{
        
    }


    useEffect(()=>{
        getNotes()
    },[])

   

    return(
        <div className="mainPage">
            <div className="div">
                <ul>
                    <li><a onClick={handleClick}>Add note</a></li>
                    <li className='account'><a onClick={toAccount}>My account</a></li>
                </ul>
            </div>


            <table className="content">
                <tr>
                    <th className='groupN'>
                        portiunea unde isi grupeaza notitele
                        {/* <button onClick={addFolder}> Add a folder</button> */}
                    </th>
                    <th className='notes'>
                        {/* handle cazul in care utilizatorul cauta cv ce nu exista */}
                        <input type="text" placeholder="Search" onChange={handleChange}/>
                        {(state.query===''?addDiv():state.list.map(note=>{
                            return <div>{note.title}</div>
                        }))}
                    </th>
                    <th className='contentN'>
                        {/* alta idee sincer n am */}
                        {stateC===''?"":addEditableDiv()}
                        {/* {stateD===''?" ":showNote()} */}
                    </th>

                </tr>
            </table>
            
        </div>
    )



}

export default MainPage