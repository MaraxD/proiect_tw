import React, {useState} from "react";
import { Link } from "react-router-dom";

function RegisterPage(){

    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[name,setName]=useState('');
    const[surname,setSurname]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email);
    }


    return (
        <div className="auth-form">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e)=> setName(e.target.value)} placeholder="Ionescu" id="name" name="name"/>
            <label htmlFor="surname">Surname</label>
            <input value={surname} onChange={(e)=> setSurname(e.target.value)} placeholder="Ionescu" id="name" name="name"/>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="blahblah@stud.ase.ro" id="email" name="email"/>
            <label for="password">password</label>
            <input value={pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button>Register</button>
        </form>
        <Link to="/LoginPage"><button>So you have an account ok! Log in then</button></Link>
        </div>

            )

}
export default RegisterPage