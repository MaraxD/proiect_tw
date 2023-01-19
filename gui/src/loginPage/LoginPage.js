import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import  {AiOutlineUser} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'
import './loginPage.css'


const server="http://localhost:8080"

function LoginPage(){

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[users,setUsers]=useState([{}])
    const navigate=useNavigate()

    const getUsers=async()=>{
        const res=await fetch(`${server}/api/data`)
        const data=await res.json()
        setUsers(data)
    }

   

    const verifyData=()=>{
        if(email.includes('@stud.ase.ro')){
            for(let u of users){
                if(u.email===email && u.password===password){
                    const userId=u.id
                    navigate('/mainPage',{state:{user:userId}})
                }else{
                    console.log('datele nu au fost gasite in BD')
                }
            }   
        }else{
            console.log('mailul nu e de ase')
        }
        
    }

    useEffect(()=>{
        getUsers()
    },[])


    return (
        <div className="auth-form">
                <div class="box">
                    <div class="container">
                        <div class="top">
                            <span>ASE Notes</span>
                            <header>Log in</header>
                        </div>
                        <div class="input-field">
                            <input type="text" class="input" placeholder="Username" id="" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                             <AiOutlineUser className="bx"/> 
                        </div>
                        <div class="input-field">
                            <input type="Password" class="input" placeholder="Password" id="" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                            <RiLockPasswordLine className="bx"/>
                        </div>
                        <div class="input-field">
                            <input type="submit" class="submit" value="Log in" id="" onClick={verifyData}/>
                        </div>
                        <div class="two-col">
                            <div class="one">
                            <input type="checkbox" name="" id="check"/>
                            <label for="check"> Remember Me</label>
                            </div>
                        </div>
                    </div>
                </div>    
          
        </div>

    )
    
}
export default LoginPage