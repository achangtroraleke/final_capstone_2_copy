import React, { useContext, useEffect } from "react";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";
import LoginPage from "./Loginpage";

import { AuthProvider } from "../context/AuthContext";
import PrivateRoutes from "../utils/PrivateRoute";
import Navbar from "./Navbar";
import Registerpage from "./Registerpage";
import Recipepage from "./Recipepage";
import Profilepage from "./Profilepage";
import Error from "./Error";

const Mealify = () =>{;
    


    return(
        <main>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar/>
                    <Error/>
                    <Routes>
                        <Route element={<PrivateRoutes/>}>
                            <Route element={<Homepage/>} path="/"/>
                            <Route element={<Recipepage/>} path="recipe/:recipe_id"/>
                            <Route element={<Profilepage/>} path="/profile"/>
                        </Route>
                        <Route element={<Registerpage/>} path="/register"/>
                        <Route element={<LoginPage/>} path="/login"/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </main>
    )
}

export default Mealify;