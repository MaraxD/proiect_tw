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
                    alert('datele nu au fost gasite in BD')
                }
            }   
        }else{
            alert('mailul nu e de ase')
        }
        
    }

    useEffect(()=>{
        getUsers()
    },[])


    return (
        <div className="auth-form">
                <div class="box">
                    <div class="container-auth">
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
                       
                    </div>
                </div>    


                
          
        </div>

        // <div className='containerLP'>
        //     <div className='login-leftLP'>
        //         <div className='login-headerLP'>
        //             <h1> ASE Notes </h1>
        //             <p>Please log in to use the platform! ^_^</p>
        //         </div>

        //         <form className='login-formLP'>
        //             <div className='login-form-contentLP'>
        //                 <div className='form-itemLP'>
        //                     <label htmlFor='email'>Write Email</label>
        //                     <input type="text" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        //                 </div>

        //                 <div className='form-itemLP'>
        //                     <label htmlFor='password'>Enter Password</label>
        //                     <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
        //                 </div>

        //                 <div className='form-itemLP'>
        //                     <div className='checkbox'>
        //                         <input type="checkbox" id="rememberMeCheckbox" ></input>
        //                         <label htmlFor='rememberMeCheckbox' class="checkboxLabelLP">Remember me</label>
                                
        //                     </div>
        //                 </div>
        //                 <button type='submit' onClick={verifyData}>Log in</button>
        //             </div>

        //             <div className='login-form-footerLP'></div>
        //         </form>

        //     </div>

        //     <div className='login-rightLP'>
        //         <img src={require('./ase_pic.jpg')} alt='imagine ase login'/>
        //     </div>
        // </div>

    )
    
    
}
export default LoginPage