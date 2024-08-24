import { useState } from "react";

const useFields = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name]:value
        }))
       
    }
    const resetData = () =>{
        setFormData(initialState)
    
    }
    return [formData, handleChange, resetData]
}

export default useFields;