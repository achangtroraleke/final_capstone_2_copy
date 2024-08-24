import React, { useContext } from "react";
import useFields from "../hooks/useFields";
import AuthContext from "../context/AuthContext";

const Registerpage = () =>{
    const {registerUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        username:'',
        email:'',
        password:''
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        registerUser(formData)
        localStorage.clear();
    }

    return(
        <section flex-column>
            <form id="" className="flex-column form-style container card card-container">
                <h1 className="no-margin">Register</h1>
                <input  onChange={handleChange} type='text' name='username' placeholder='Username' value={formData.username} required/>
                <input  onChange={handleChange} type='text' name='email' placeholder='Email' value={formData.email} required/>
                <input  onChange={handleChange} type='password' name='password' placeholder='Password' value={formData.password} required/>
                <button onClick={handleSubmit} type="submit">Register</button>
            </form>
        </section>
    )
}

export default Registerpage