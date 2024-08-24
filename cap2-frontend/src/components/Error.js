import  { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Error = () =>{
    const {error, setError} = useContext(AuthContext)

    console.log(error)

    
    if(error){
       
        alert(JSON.stringify(error))
        setError(null)
    
    }

}
export default Error;