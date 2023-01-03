import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './mainPage.css'

const server="http://localhost:8080"

function MainPage(){
    const[notes,setNotes]=useState([{}])
    const[state,setState]=useState({query:'',list:[]})
    const navigate=useNavigate()

    const getNotes=async()=>{
        //again id ul nu trebuie sa fie hardcodat
        const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/notes`)
        const data=await res.json()
        setNotes(data)
    }

    const showNote=()=>{
        console.log("hey")
    }

    const addDiv=()=>{
        return notes.map((e)=>{
            return(
                <div>{e.title}</div>
            )
        })
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
                        {/* handle cazul in care utilizatorul cauta cv ce nu exista */}
                        <input type="text" placeholder="Search" onChange={handleChange}/>
                        {(state.query===''?addDiv():state.list.map(note=>{
                            return <div>{note.title}</div>
                        }))}
                    </th>
                    <th className='contentN'>
                    </th>

                </tr>
            </table>
            
        </div>
    )



}

export default MainPage