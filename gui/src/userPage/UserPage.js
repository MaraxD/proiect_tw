import {useEffect, useState} from 'react'
import './userPage.css'
import image from './user.jpg'

const server="http://localhost:8080"


function UserPage(props){
    const[user,setUser]=useState([{}])

    const getUser=async()=>{
        //mailul nu ar trebui hardcodat
        const res=await fetch(`${server}/api/users/olarumara20@stud.ase.ro/users`)
        const data=await res.json()        
        setUser(data)
        console.log(data)
    }

    const changeData=()=>{

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
                        {user[0].email}
                        <button className='btnChange'>Change email</button>
                    </div>                     
                    

                    {/* de implementat editUser, de folosit onClick pe button */}

                    <div className='fullName'>
                        <p>Name</p>                   
                        <input className="prefName" type="text" value={user[0].firstName} onChange={changeData}/>

                        <p>Last name</p>                   
                        <input className="prefName" type="text" value={user[0].lastName}/>
                    </div>
                </div>

                {/* delete student si se revine pe pagina de login */}
                <button className='btnDelete'>Delete my account</button>
            

                <div className='btnGroup'>
                    <button className='btnUpdate'>Update</button>
                    <button className='btnCancel'>Go home</button>
                </div>
            </div>
            
            

        </div>
    )
}

export default UserPage