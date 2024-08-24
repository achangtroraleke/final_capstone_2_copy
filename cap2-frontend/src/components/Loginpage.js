import React, { useContext, useEffect } from "react";
import useFields from "../hooks/useFields";
import AuthContext from "../context/AuthContext";
const LoginPage = () =>{
        
        let {loginUser} = useContext(AuthContext);
    

        const INITIAL_STATE = {
            email:'',
            password:''
        }
        const [formData, handleChange] = useFields(INITIAL_STATE)

        
    
        
    
        const handleSubmit = async (e) =>{
            e.preventDefault();
            loginUser(formData)
            localStorage.clear();
        }
    
    

    
        return(
            <section>
    
            
            <form id="" className="flex-column form-style container card card-container">
                <h1 className="no-margin">Login</h1>
                <input required onChange={handleChange} type='text' name='email' placeholder='Email' value={formData.email}/>
                <input required onChange={handleChange} type='password' name='password' placeholder='Password' value={formData.password}/>
                <button onClick={handleSubmit} type="submit">Login</button>
            </form>
            </section>
    )
}

export default LoginPage;