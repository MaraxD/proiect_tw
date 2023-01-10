import React, {useState} from "react";
import { Link } from "react-router-dom";

/*
in app.js putem sa ne folosim de use state
const [currForm, setCurrentForm]=useState('login');
in return intr un div ceva currForm === 'login'?<LoginPage/>:<RegisterPage/>
*/


function LoginPage(){

    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email);
    }

    


    return (
        <div className="auth-form">
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="blahblah@stud.ase.ro" id="email" name="email"/>
            <label for="password">password</label>
            <input value={pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <Link to="/"><button>Log in</button></Link>
            {/* l am legat de pagina de home */}
        </form>
        <Link to="/RegisterPage"><button>OH you don`t have an account eh? Register then</button></Link>
        </div>

            )
    
}
export default LoginPage