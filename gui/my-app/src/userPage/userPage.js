import{useEffect, useState} from "react"

const server="http://localhost:8080"

function UserPage(props){
    const[users,setUsers]=useState()

    const getUsers=async()=>{
        //de schimbat aici si in server
        const res=await fetch(`${server}/api/users/olarumara20@stud.ase.ro/users`)
        const data=await res.json()
        setUsers(data)
    }

    useEffect(()=>{
        getUsers()
    },[])

    return(
        <div className="user">
            <div className="nume">${users.firstName}</div>
            <div className="prenume">${users.lastName}</div>
            <div className="email">${users.email}</div>

        </div>
    )
}