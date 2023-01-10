import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './userPage.css'
import image from './user.jpg'

const server="http://localhost:8080"


function UserPage(props){
    const[user,setUser]=useState([{}])
    const[name,setName]=useState("")
    const[lastName,setLName]=useState("")
    const[email,setEmail]=useState("")
    const navigate=useNavigate()

    const getUser=async()=>{
        //mailul nu ar trebui hardcodat
        const res=await fetch(`${server}/api/users/olarumara20@stud.ase.ro/users`)
        const data=await res.json()        
        setUser(data)
        //idk if this is the most efficient way
        setName(data[0].firstName)
        setLName(data[0].lastName)
        setEmail(data[0].email)
    }

    const changeData=async()=>{
       const res=await fetch(`${server}/api/users/olarumara20@stud.ase.ro/users`,
        {
            method:'PUT',
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify(user[0])
        })
        getUser()

    }

    const deleteUser=()=>{
        fetch(`${server}/api/users/olarumara20@stud.ase.ro/users`,{method:'DELETE'})
        .then(()=>{
            console.log("user deleted successfully")
        }).then(navigate("/login"))
    }

    const editData=event=>{
        if(event.target.className==="name"){
            setName(event.target.value)
            user[0].firstName=event.target.value
            setUser(user)
        }else if(event.target.className==="lastName"){
            setLName(event.target.value)
            user[0].lastName=event.target.value
            setUser(user)
        }
    }

    const goHome=()=>{
        navigate("/mainPage")
    }

    useEffect(()=>{
        getUser()
    },[])

    return(
        <div className='user'>
            <div className='subUser'>
                
                <h3>Account</h3>
                <div class="userPhoto">
                    <p>Photo</p>
                    <img src={image}/>
                </div>

                <div className='personalInfo'>
                    <div className='email'> 
                        <p>Email</p>
                        {email}
                        {/* aici nu stiu inca daca sa las utilizatorul sa si schimbe mailul */}
                        <button className='btnChange'>Change email</button>
                    </div>                     
                    

                    <div className='fullName'>
                        <p>Name</p>                   
                        <input className="name" type="text" value={name} onChange={editData}/>

                        <p>Last name</p>                   
                        <input className="lastName" type="text" value={lastName} onChange={editData}/>
                    </div>
                </div>

                {/* delete student si se revine pe pagina de login */}
                <button className='btnDelete' onClick={deleteUser}>Delete my account</button>
            

                {/* de implementat editUser, de folosit onClick pe button */}
                <div className='btnGroup'>
                    <button className='btnUpdate' onClick={changeData}>Update</button>
                    <button className='btnCancel'onClick={goHome}>Go home</button>
                </div>
            </div>
            
            

        </div>
    )
}

export default UserPage



