import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import '../styles/MealCard.css';



const Recipepage = () =>{
    let {recipe_id}  = useParams();
    const {getRecipeData, isLoading, setLoading, recipe, addFavorite,removeFavorite, favId} = useContext(AuthContext)

    useEffect(()=>{
        
        setLoading(true)
        getRecipeData({'id':recipe_id})
       
        
    },[favId])

    const handleAdd = () =>{
        addFavorite({"id":recipe.id})
    }

    const handleRemove = () =>{
        removeFavorite(recipe.id)
    }

    if(isLoading)return(
        <div>
            Loading...
        </div>
    )
    return(
        <section>
            <div className=" container">
               
              
                <div className="flex-column card">
                  
                    <div className="flex-header flex align-center">
                        <img className="thumbnail" src={recipe.image}/>      
                        <div className="flex-column content ">
                            
                            <h1>{recipe.title}</h1>
                            <div className="flex">
                            {!favId.includes(recipe.id)?<button onClick={handleAdd}>Favorite</button>:<button onClick={handleRemove}>Remove From Favorites</button>}
                            </div>
                        <h3>Serving Size: {recipe.servings}</h3>
                        <p>Prep Time: {recipe.readyInMinutes} minutes</p>
                        </div>
                    </div>
                    <div className="content">

                        <div>
                            <h4>Ingredients</h4>
                            <ul>
                                {recipe.extendedIngredients.map((ingredient)=>{
                                    return(
                                        <li key={ingredient.id}>
                                            <h5>{ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} - {ingredient.name}</h5>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="instructions">
                            <h4>Instructions</h4>
                            {parse(recipe.instructions)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Recipepage;