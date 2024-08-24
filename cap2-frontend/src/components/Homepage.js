import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useFields from "../hooks/useFields";
import MealCard from "./MealCard";

const Homepage = () =>{
    const {user, meals, getFoodData, isLoading, setError, setFavId, favId, setLoading} = useContext(AuthContext);
    const [ingredientsList, setIngredients] = useState([])
    const INITIAL_STATE = {
        ingredient:'',

    }
    const [formData, handleChange, resetData] = useFields(INITIAL_STATE)

    useEffect(()=>{
        setLoading(false)
        if(!favId){
            if(!user.favorites['recipes']){
                setFavId([])
            }
            else setFavId(user.favorites['recipes'])
        }
      
        
    },[favId])

    const handleAddIngr = (e) =>{
        e.preventDefault()
        if(formData.ingredient < 1){
         
            setError('Ingredient Field cannot be blank.')
            return false
        }
        if(ingredientsList.includes(formData.ingredient)){
            setError('Cannot have duplicate ingredients.')
            return false
        }
        setIngredients([...ingredientsList, formData.ingredient])
        resetData()
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        getFoodData({"ingredients":ingredientsList})

    }

    const handleRemove = (i) =>{
        setIngredients(ingredientsList.filter((ing) =>ing !== i ))
    }

    if(isLoading){
        return(
            <div>Loading</div>
        )
    }
    
    return(
        <section>
            <div className=" flex-column container ">
                <h1>Welcome to Mealify!</h1>
                {user?
                <div><h1>Let's Cook!</h1></div>:
                null}
             
                <div className="flex-column align-center feed">
                <div className="card flex-column card-container">
                    <form id="" className="flex-column form-style ">
                        <h1 className="no-margin">Add Your Ingredients</h1>
                        <input required onChange={handleChange} type='text' name='ingredient' placeholder='Ingredient' value={formData.ingredient}/>

                        <button onClick={handleAddIngr}>Add</button>
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                    <ul className="flex-column  center my-ul feed">
                            <h2 className="">Ingredients You Have</h2>
                        {ingredientsList.map((foodIngr, idx)=>{
                            return(
                            <li className="card align-center flex" key={idx}>
                                  <h3>{foodIngr.toUpperCase()}</h3>
                                 <button onClick={()=>handleRemove(foodIngr)}>Remove</button>
                            </li>)
                        })}
                        </ul>
                    </div>
                    {meals?
                   
                   
                        <ul className="flex-column feed card-container align-center my-ul">
                           
                        {meals.map((meal)=>{
                            return(<MealCard key={meal.id} meal={meal}/>)
                        })}
                    
                    </ul>:null}
                </div>
            </div>
        </section>
    )
}
export default Homepage