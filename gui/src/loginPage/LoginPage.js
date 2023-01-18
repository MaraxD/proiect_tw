import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
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
                    navigate('/mainPage')
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
                {/* <div>
                    <label htmlFor="email">email</label><br></br>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="blahblah@stud.ase.ro" className="email" name="email"/>
                </div>
                
                <div>
                    <label for="password">password</label><br></br>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                </div>
                
               <button onClick={verifyData}>Log in</button> */}

<div class="box">
    <div class="container">
        <div class="top">
            <span>ASE Notes</span>
            <header>Login</header>
        </div>
        <div class="input-field">
            <input type="text" class="input" placeholder="Username" id=""/>
            <i class='bx bx-user' ></i>
        </div>
        <div class="input-field">
            <input type="Password" class="input" placeholder="Password" id=""/>
            <i class='bx bx-lock-alt'></i>
        </div>
        <div class="input-field">
            <input type="submit" class="submit" value="Login" id=""/>
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