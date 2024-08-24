import  {useState, useEffect} from "react";

const useLocalStorageState = (key, defaultValue) => {

    
    const [state, setState] = useState(()=>{
        try{
         
            let value = JSON.parse(localStorage.getItem(key) || defaultValue);
       
            return value;
        }catch(err){
            console.log(err)
        }
        
    });

    useEffect(()=>{
        
        localStorage.setItem(key,JSON.stringify(state))
       
    }, [key,state])

    return [state, setState]
}

export default useLocalStorageState;