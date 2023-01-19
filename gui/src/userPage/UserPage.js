import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import './userPage.css'
import image from './user.jpg'

const server="http://localhost:8080"


function UserPage(){
    const location=useLocation()
    const userId=location.state.userId

    const[user,setUser]=useState({})
    const[name,setName]=useState("")
    const[lastName,setLName]=useState("")
    const[email,setEmail]=useState("")
    const navigate=useNavigate()

    const getUser=async()=>{
        //mailul nu ar trebui hardcodat
        const res=await fetch(`${server}/api/users/${userId}/users`)
        const data=await res.json()        
        setUser(data)
        //idk if this is the most efficient way
        setName(data.firstName)
        setLName(data.lastName)
        setEmail(data.email)
    }

    const changeData=async()=>{
        console.log(user)
       const res=await fetch(`${server}/api/users/${userId}/users`,
        {
            method:'PUT',
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify(user)
        })
        getUser()

    }

    const deleteUser=()=>{
        fetch(`${server}/api/users/${userId}/users`,{method:'DELETE'})
        .then(()=>{
            console.log("user deleted successfully")
        }).then(navigate("/"))
    }

    const editData=event=>{
        if(event.target.className==="name"){
            setName(event.target.value)
            user.firstName=event.target.value
            setUser(user)
        }else if(event.target.className==="lastName"){
            setLName(event.target.value)
            user.lastName=event.target.value
            setUser(user)
        }
    }

    const goHome=()=>{
        navigate('/mainPage',{state:{user:userId}})
    }

    const goMainPage=()=>{
        navigate('/')
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
                        <p className='pN'>Name</p>                   
                        <input className="name" type="text" value={name} onChange={editData}/>

                        <p className='pLN'>Last name</p>                   
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

                <div className='logout' onClick={goMainPage}>Log out</div>
            </div>
            
            

        </div>
    )
}

export default UserPage



