import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './mainPage.css'

const server="http://localhost:8080"

function MainPage(){
    const[notes,setNote]=useState([{}])
    const navigate=useNavigate()

    const getNotes=async()=>{
        //again id ul nu trebuie sa fie hardcodat
        const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/notes`)
        const data=await res.json()
        setNote(data)
        for(let i=0;i<notes.length;i++){
            console.log(notes[i].dateCreated)
        }
    }

    const createNote=()=>{
        // if(notes!=null){
            for(let i=0;i<notes.length;i++){
                console.log(notes[i].dateCreated)
            }
                // let divN=document.createElement('div')
                // divN.setAttribute('className','divNote')
                // divN.innerHTML=e.title+e.dateCreated      
         
        // }
    }

    const toAccount=()=>{
        navigate('/userPage')
    }

    useEffect(()=>{
        getNotes()
    },[])

    return(
        <div className="mainPage">
            <div className="div">
                <ul>
                    <li>Add note</li>
                    <li className='account'><a onClick={toAccount}>My account</a></li>
                </ul>
            </div>

            <table className="content">
                <tr>
                    <th className='groupN'>portiunea unde isi grupeaza notitele</th>
                    <th className='notes'>
                        <input type="text" placeholder="Search"/> 
                        {createNote}
                    </th>
                    <th className='contentN'>continutul notitelor</th>

                </tr>
            </table>
            
        </div>
    )



}

export default MainPage