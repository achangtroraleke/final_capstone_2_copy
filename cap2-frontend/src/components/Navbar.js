import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import "../styles/Navbar.css"

const Navbar = () =>{
    let {user, logoutUser} = useContext(AuthContext);

    return(
        <div id="navbar">
            <nav className="flex ">
                
         
            <div id="logo">
            <Link to={'/'}> <h1>Mealify 😋</h1></Link>
            </div>
            {user?<ul className="flex link-group">
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/profile'}>{user.username}</Link>
                </li>
                <li>
                    <a href="" onClick={logoutUser}>Logout</a>
                </li>
            </ul>:<ul className="flex link-group">
                    <li>
                    <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                    <li>
                    <Link to={'/register'}>Register</Link>
                    </li>
            </ul>}
            </nav>
        </div>
    )
}

export default Navbar;