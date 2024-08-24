import React, { useContext } from "react";
import '../styles/MealCard.css';
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const MealCard = (props) =>{
    const {meal} = props

    const {addFavorite, removeFavorite, favId} = useContext(AuthContext);
  

    
    const handleClick = () =>{
        console.log(meal.id)
        addFavorite({"id":meal.id})
    }
    const handleRemove = () =>{
        removeFavorite(meal.id)
    }
    return(
        <li  className="card flex-column align-center ">
            <div className=" flex-column card-content ">
            <div id="" className="flex-column align-center flex-header">
                <img className="thumbnail" src={meal.image} alt={meal.title}/>
                <h3>{meal.title}</h3>
                <div className="button-group flex">
                {favId.includes(meal.id)?
                <button onClick={handleRemove}>Unfavorite</button>:
                <button onClick={handleClick}>Favorite</button>}


                <Link to={`/recipe/${meal.id}`}><button>Recipe</button>
                </Link>
                </div>
            </div>
            <div id="ingredients-list" className="flex">
            <ul className="flex-column text-left my-ul">
                <h4>Ingredients on hand:</h4>
                    {meal.usedIngredients.map((ingredient)=>{
                        return(
                            <li key={ingredient.id}>
                               {ingredient.name}
                            </li>
                        )
                    })}  
                </ul>
                <ul className="flex-column text-left my-ul"> 
                <h4>Missing Ingredients:</h4>
                    {meal.missedIngredients.map((ingredient)=>{
                        return(
                            <li key={ingredient.id}>
                               {ingredient.name}
                            </li>
                        )
                    })}
                  
                </ul>
            </div>
            
            </div>
        </li>
    )
}
export default MealCard;