import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "../App.css";
import { Link } from "react-router-dom";

const Profilepage = () => {
    let {user, getAllFavoriteRecipes, favorites, removeFavorite, isLoading, setLoading, favId} = useContext(AuthContext);

    
    useEffect(()=>{
        setLoading(true)
        
        getAllFavoriteRecipes(favId)
        
       
    },[favId])


    const handleClick = (id) =>{
        removeFavorite(id)
    }
    if(isLoading){
        return(
            <div>Loading</div>
        )
    }
   
    return(
        <section className="">
            <h1>Welcome {user.username}</h1>
            <div className="card flex-column card-container center align-center">
                <h3>Your Favorite Recipes:</h3>
                {favorites?<ul className="flex-column text-left card-container feed align-center my-ul">
                    {favorites.map((recipe)=>{
                        return(
                            <li className="card flex align-center card-container">
                                 <button onClick={()=>handleClick(recipe.id)}>X</button>
                                {recipe.title}
                                <Link to={`/recipe/${recipe.id}`}><button>Recipe</button>
                                </Link>
                               
                            </li>
                        )
                    })}
                </ul>:null}
            </div>
        </section>
    )
}
export default Profilepage;