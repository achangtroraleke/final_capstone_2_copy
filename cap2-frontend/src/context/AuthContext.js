import { createContext, useEffect, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorage";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) =>{

    const TEST_RECIPES = [
        {
            "id": 661447,
            "title": "Square Deviled Eggs",
            "image": "https://img.spoonacular.com/recipes/661447-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 1129,
                    "amount": 6,
                    "unit": "servings",
                    "unitLong": "servings",
                    "unitShort": "servings",
                    "aisle": "Milk, Eggs, Other Dairy",
                    "name": "eggs",
                    "original": "Hard boiled eggs",
                    "originalName": "Hard boiled eggs",
                    "meta": [
                        "hard",
                        "boiled"
                    ],
                    "extendedName": "cooked eggs",
                    "image": "https://img.spoonacular.com/ingredients_100x100/hard-boiled-egg.png"
                },
                {
                    "id": 10151,
                    "amount": 6,
                    "unit": "servings",
                    "unitLong": "servings",
                    "unitShort": "servings",
                    "aisle": "Meat",
                    "name": "ham",
                    "original": "Ham",
                    "originalName": "Ham",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/ham-whole.jpg"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1017,
                    "amount": 6,
                    "unit": "servings",
                    "unitLong": "servings",
                    "unitShort": "servings",
                    "aisle": "Cheese",
                    "name": "cream cheese",
                    "original": "Cream cheese",
                    "originalName": "Cream cheese",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/cream-cheese.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 25
        },
        {
            "id": 1155776,
            "title": "Easy Homemade Chocolate Truffles",
            "image": "https://img.spoonacular.com/recipes/1155776-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 1052050,
                    "amount": 1.5,
                    "unit": "tsp",
                    "unitLong": "teaspoons",
                    "unitShort": "tsp",
                    "aisle": "Baking",
                    "name": "vanilla",
                    "original": "1 1/2 tsp vanilla",
                    "originalName": "vanilla",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/vanilla.jpg"
                },
                {
                    "id": 10019903,
                    "amount": 3,
                    "unit": "cups",
                    "unitLong": "cups",
                    "unitShort": "cup",
                    "aisle": "Baking",
                    "name": "semi chocolate chips",
                    "original": "3 cups semi sweet chocolate chips melted",
                    "originalName": "semi sweet chocolate chips melted",
                    "meta": [
                        "sweet",
                        "melted"
                    ],
                    "extendedName": "sweet semi chocolate chips",
                    "image": "https://img.spoonacular.com/ingredients_100x100/chocolate-chips.jpg"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1017,
                    "amount": 8,
                    "unit": "oz",
                    "unitLong": "ounces",
                    "unitShort": "oz",
                    "aisle": "Cheese",
                    "name": "cream cheese",
                    "original": "1 8 oz. package cream cheese",
                    "originalName": "package cream cheese",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/cream-cheese.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 2
        },
        {
            "id": 655477,
            "title": "Peas And Tarragon With Fresh Goat Cheese",
            "image": "https://img.spoonacular.com/recipes/655477-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 11304,
                    "amount": 1,
                    "unit": "pound",
                    "unitLong": "pound",
                    "unitShort": "lb",
                    "aisle": "Produce",
                    "name": "peas",
                    "original": "1 pound Peas",
                    "originalName": "Peas",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/peas.jpg"
                },
                {
                    "id": 2041,
                    "amount": 1,
                    "unit": "teaspoon",
                    "unitLong": "teaspoon",
                    "unitShort": "tsp",
                    "aisle": "Produce",
                    "name": "tarragon",
                    "original": "1 teaspoon Chopped tarragon",
                    "originalName": "Chopped tarragon",
                    "meta": [
                        "chopped"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/tarragon.jpg"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1159,
                    "amount": 1,
                    "unit": "package",
                    "unitLong": "package",
                    "unitShort": "pkg",
                    "aisle": "Cheese",
                    "name": "chavrie goat cheese",
                    "original": "1 package 5.3 oz. Chavrie fresh goat cheese, Pyramid",
                    "originalName": "5.3 oz. Chavrie fresh goat cheese, Pyramid",
                    "meta": [
                        "fresh"
                    ],
                    "extendedName": "fresh chavrie goat cheese",
                    "image": "https://img.spoonacular.com/ingredients_100x100/goat-cheese.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 1
        },
        {
            "id": 633227,
            "title": "Baby Brie Wedge In Phyllo",
            "image": "https://img.spoonacular.com/recipes/633227-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 93632,
                    "amount": 4,
                    "unit": "tablespoons",
                    "unitLong": "tablespoons",
                    "unitShort": "Tbsp",
                    "aisle": "Ethnic Foods",
                    "name": "clarified butter",
                    "original": "4 tablespoons Clarified Butter or melted butter",
                    "originalName": "Clarified Butter or melted butter",
                    "meta": [
                        "melted"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/ghee.jpg"
                },
                {
                    "id": 18338,
                    "amount": 3,
                    "unit": "sheets",
                    "unitLong": "sheets",
                    "unitShort": "sheets",
                    "aisle": "Refrigerated",
                    "name": "phyllo dough",
                    "original": "3 sheets Phyllo dough",
                    "originalName": "Phyllo dough",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/filo-dough.png"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1006,
                    "amount": 1,
                    "unit": "",
                    "unitLong": "",
                    "unitShort": "",
                    "aisle": "Cheese",
                    "name": "wedge alouette baby brie",
                    "original": "1 wedge Alouette Baby Brie",
                    "originalName": "wedge Alouette Baby Brie",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/brie.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 1
        },
        {
            "id": 645708,
            "title": "Grilled Figs With Brie and Prosciutto",
            "image": "https://img.spoonacular.com/recipes/645708-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 9089,
                    "amount": 2,
                    "unit": "",
                    "unitLong": "",
                    "unitShort": "",
                    "aisle": "Produce",
                    "name": "figs",
                    "original": "2 figs per skewer",
                    "originalName": "figs per skewer",
                    "meta": [
                        "per skewer"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/figs-fresh.jpg"
                },
                {
                    "id": 10010123,
                    "amount": 1,
                    "unit": "slice",
                    "unitLong": "slice",
                    "unitShort": "slice",
                    "aisle": "Meat",
                    "name": "prosciutto",
                    "original": "1 slice prosciutto per fig",
                    "originalName": "prosciutto per fig",
                    "meta": [
                        "per fig"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/proscuitto.jpg"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1006,
                    "amount": 1,
                    "unit": "square",
                    "unitLong": "square",
                    "unitShort": "square",
                    "aisle": "Cheese",
                    "name": "brie cheese",
                    "original": "1 square brie cheese per fig",
                    "originalName": "brie cheese per fig",
                    "meta": [
                        "per fig"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/brie.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 1
        },
        {
            "id": 644958,
            "title": "Goat Cheese Stuffed Bacon Wrapped Jalapeno Appetizer",
            "image": "https://img.spoonacular.com/recipes/644958-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 10310123,
                    "amount": 6,
                    "unit": "slices",
                    "unitLong": "slices",
                    "unitShort": "slice",
                    "aisle": "Meat",
                    "name": "bacon",
                    "original": "6 slices thick sliced bacon",
                    "originalName": "thick sliced bacon",
                    "meta": [
                        "thick",
                        "sliced"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/raw-bacon.png"
                },
                {
                    "id": 11979,
                    "amount": 6,
                    "unit": "",
                    "unitLong": "",
                    "unitShort": "",
                    "aisle": "Canned and Jarred",
                    "name": "jalapenos",
                    "original": "6 jalapenos",
                    "originalName": "jalapenos",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/jalapeno-pepper.png"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1159,
                    "amount": 3,
                    "unit": "ounces",
                    "unitLong": "ounces",
                    "unitShort": "oz",
                    "aisle": "Cheese",
                    "name": "goat cheese",
                    "original": "3 ounces Goat cheese",
                    "originalName": "Goat cheese",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/goat-cheese.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 1
        },
        {
            "id": 157994,
            "title": "Oreo Balls",
            "image": "https://img.spoonacular.com/recipes/157994-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 99278,
                    "amount": 10,
                    "unit": "oz",
                    "unitLong": "ounces",
                    "unitShort": "oz",
                    "aisle": "Baking",
                    "name": "chocolate chips",
                    "original": "10-12 oz. of CHOCOLATE ALMOND BARK or CHOCOLATE CHIPS",
                    "originalName": "CHOCOLATE ALMOND BARK or CHOCOLATE CHIPS",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/chocolate-chips.jpg"
                },
                {
                    "id": 10018166,
                    "amount": 30,
                    "unit": "",
                    "unitLong": "",
                    "unitShort": "",
                    "aisle": "Sweet Snacks",
                    "name": "oreo cookies",
                    "original": "30 oreo cookies",
                    "originalName": "oreo cookies",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/oreos.png"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1017,
                    "amount": 8,
                    "unit": "oz",
                    "unitLong": "ounces",
                    "unitShort": "oz",
                    "aisle": "Cheese",
                    "name": "cream cheese",
                    "original": "8 oz cream cheese",
                    "originalName": "cream cheese",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/cream-cheese.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 0
        },
        {
            "id": 840243,
            "title": "Parmesan Kale Chip Dusted Popcorn",
            "image": "https://img.spoonacular.com/recipes/840243-312x231.png",
            "imageType": "png",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 1049,
                    "amount": 1,
                    "unit": "serving",
                    "unitLong": "serving",
                    "unitShort": "serving",
                    "aisle": "Milk, Eggs, Other Dairy",
                    "name": "half a batch of baby kale chips",
                    "original": "about half a batch of baby kale chips",
                    "originalName": "about half a batch of baby kale chips",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/fluid-cream.jpg"
                },
                {
                    "id": 19034,
                    "amount": 5,
                    "unit": "cups",
                    "unitLong": "cups",
                    "unitShort": "cup",
                    "aisle": "Savory Snacks",
                    "name": "popcorn",
                    "original": "5 cups popcorn (one bag of Jolly Time Healthy Pop)",
                    "originalName": "popcorn (one bag of Jolly Time Healthy Pop)",
                    "meta": [
                        "(one bag of Jolly Time Healthy Pop)"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/popcorn.png"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1032,
                    "amount": 1,
                    "unit": "teaspoons",
                    "unitLong": "teaspoon",
                    "unitShort": "tsp",
                    "aisle": "Cheese",
                    "name": "parmesan cheese",
                    "original": "1 to 2 teaspoons grated Parmesan cheese",
                    "originalName": "grated Parmesan cheese",
                    "meta": [
                        "grated"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/parmesan.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 0
        },
        {
            "id": 1416203,
            "title": "Tater Tot Chili Cheese Casserole",
            "image": "https://img.spoonacular.com/recipes/1416203-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 2,
            "missedIngredients": [
                {
                    "id": 11819,
                    "amount": 2,
                    "unit": "cups",
                    "unitLong": "cups",
                    "unitShort": "cup",
                    "aisle": "Produce",
                    "name": "chili",
                    "original": "2 cups chili",
                    "originalName": "chili",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/red-chili.jpg"
                },
                {
                    "id": 11398,
                    "amount": 2,
                    "unit": "cups",
                    "unitLong": "cups",
                    "unitShort": "cup",
                    "aisle": "Frozen",
                    "name": "tater tots",
                    "original": "2 cups tater tots",
                    "originalName": "tater tots",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/tater-tots.jpg"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1001009,
                    "amount": 1,
                    "unit": "cup",
                    "unitLong": "cup",
                    "unitShort": "cup",
                    "aisle": "Cheese",
                    "name": "cheddar cheese",
                    "original": "1 cup shredded cheddar cheese",
                    "originalName": "shredded cheddar cheese",
                    "meta": [
                        "shredded"
                    ],
                    "extendedName": "shredded cheddar cheese",
                    "image": "https://img.spoonacular.com/ingredients_100x100/shredded-cheddar.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 0
        },
        {
            "id": 649347,
            "title": "Layered Cranberry Sauce",
            "image": "https://img.spoonacular.com/recipes/649347-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 1,
            "missedIngredientCount": 3,
            "missedIngredients": [
                {
                    "id": 16090,
                    "amount": 0.5,
                    "unit": "cup",
                    "unitLong": "cups",
                    "unitShort": "cup",
                    "aisle": "Savory Snacks",
                    "name": "roasted peanuts",
                    "original": "1/2 cup Dry Roasted Peanuts (chopped)",
                    "originalName": "Dry Roasted Peanuts (chopped)",
                    "meta": [
                        "dry",
                        "chopped",
                        "()"
                    ],
                    "extendedName": "dry roasted peanuts",
                    "image": "https://img.spoonacular.com/ingredients_100x100/peanuts.png"
                },
                {
                    "id": 4025,
                    "amount": 2,
                    "unit": "tablespoons",
                    "unitLong": "tablespoons",
                    "unitShort": "Tbsp",
                    "aisle": "Condiments",
                    "name": "mayo",
                    "original": "2 tablespoons Mayo",
                    "originalName": "Mayo",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/mayonnaise.png"
                },
                {
                    "id": 9081,
                    "amount": 16,
                    "unit": "ounces",
                    "unitLong": "ounces",
                    "unitShort": "oz",
                    "aisle": "Canned and Jarred",
                    "name": "jellied cranberry sauce",
                    "original": "16 ounces Can Jellied Cranberry Sauce",
                    "originalName": "Jellied Cranberry Sauce",
                    "meta": [],
                    "image": "https://img.spoonacular.com/ingredients_100x100/cranberry-sauce.jpg"
                }
            ],
            "usedIngredients": [
                {
                    "id": 1017,
                    "amount": 8,
                    "unit": "ounces",
                    "unitLong": "ounces",
                    "unitShort": "oz",
                    "aisle": "Cheese",
                    "name": "cream cheese",
                    "original": "8 ounces Cream Cheese (soft)",
                    "originalName": "Cream Cheese (soft)",
                    "meta": [
                        "soft",
                        "()"
                    ],
                    "image": "https://img.spoonacular.com/ingredients_100x100/cream-cheese.jpg"
                }
            ],
            "unusedIngredients": [],
            "likes": 1
        }
    ]


    const TEST_SINGLE_RECIPE ={
        "id": 716429,
        "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        "image": "https://img.spoonacular.com/recipes/716429-556x370.jpg",
        "imageType": "jpg",
        "servings": 2,
        "readyInMinutes": 45,
        "cookingMinutes": 25,
        "preparationMinutes": 20,
        "license": "CC BY-SA 3.0",
        "sourceName": "Full Belly Sisters",
        "sourceUrl": "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
        "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
        "healthScore": 19.0,
        "spoonacularScore": 83.0,
        "pricePerServing": 163.15,
        "analyzedInstructions": [],
        "cheap": false,
        "creditsText": "Full Belly Sisters",
        "cuisines": [],
        "dairyFree": false,
        "diets": [],
        "gaps": "no",
        "glutenFree": false,
        "instructions": "",
        "ketogenic": false,
        "lowFodmap": false,
        "occasions": [],
        "sustainable": false,
        "vegan": false,
        "vegetarian": false,
        "veryHealthy": false,
        "veryPopular": false,
        "whole30": false,
        "weightWatcherSmartPoints": 17,
        "dishTypes": [
            "lunch",
            "main course",
            "main dish",
            "dinner"
        ],
        "extendedIngredients": [
            {
                "aisle": "Milk, Eggs, Other Dairy",
                "amount": 1.0,
                "consistency": "solid",
                "id": 1001,
                "image": "butter-sliced.jpg",
                "measures": {
                    "metric": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    },
                    "us": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    }
                },
                "meta": [],
                "name": "butter",
                "original": "1 tbsp butter",
                "originalName": "butter",
                "unit": "tbsp"
            },
            {
                "aisle": "Produce",
                "amount": 2.0,
                "consistency": "solid",
                "id": 10011135,
                "image": "cauliflower.jpg",
                "measures": {
                    "metric": {
                        "amount": 473.176,
                        "unitLong": "milliliters",
                        "unitShort": "ml"
                    },
                    "us": {
                        "amount": 2.0,
                        "unitLong": "cups",
                        "unitShort": "cups"
                    }
                },
                "meta": [
                    "frozen",
                    "thawed",
                    "cut into bite-sized pieces"
                ],
                "name": "cauliflower florets",
                "original": "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
                "originalName": "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
                "unit": "cups"
            },
            {
                "aisle": "Cheese",
                "amount": 2.0,
                "consistency": "solid",
                "id": 1041009,
                "image": "cheddar-cheese.png",
                "measures": {
                    "metric": {
                        "amount": 2.0,
                        "unitLong": "Tbsps",
                        "unitShort": "Tbsps"
                    },
                    "us": {
                        "amount": 2.0,
                        "unitLong": "Tbsps",
                        "unitShort": "Tbsps"
                    }
                },
                "meta": [
                    "grated",
                    "(I used romano)"
                ],
                "name": "cheese",
                "original": "2 tbsp grated cheese (I used romano)",
                "originalName": "grated cheese (I used romano)",
                "unit": "tbsp"
            },
            {
                "aisle": "Oil, Vinegar, Salad Dressing",
                "amount": 1.0,
                "consistency": "liquid",
                "id": 1034053,
                "image": "olive-oil.jpg",
                "measures": {
                    "metric": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    },
                    "us": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    }
                },
                "meta": [],
                "name": "extra virgin olive oil",
                "original": "1-2 tbsp extra virgin olive oil",
                "originalName": "extra virgin olive oil",
                "unit": "tbsp"
            },
            {
                "aisle": "Produce",
                "amount": 5.0,
                "consistency": "solid",
                "id": 11215,
                "image": "garlic.jpg",
                "measures": {
                    "metric": {
                        "amount": 5.0,
                        "unitLong": "cloves",
                        "unitShort": "cloves"
                    },
                    "us": {
                        "amount": 5.0,
                        "unitLong": "cloves",
                        "unitShort": "cloves"
                    }
                },
                "meta": [],
                "name": "garlic",
                "original": "5-6 cloves garlic",
                "originalName": "garlic",
                "unit": "cloves"
            },
            {
                "aisle": "Pasta and Rice",
                "amount": 6.0,
                "consistency": "solid",
                "id": 20420,
                "image": "fusilli.jpg",
                "measures": {
                    "metric": {
                        "amount": 170.097,
                        "unitLong": "grams",
                        "unitShort": "g"
                    },
                    "us": {
                        "amount": 6.0,
                        "unitLong": "ounces",
                        "unitShort": "oz"
                    }
                },
                "meta": [
                    "(I used linguine)"
                ],
                "name": "pasta",
                "original": "6-8 ounces pasta (I used linguine)",
                "originalName": "pasta (I used linguine)",
                "unit": "ounces"
            },
            {
                "aisle": "Spices and Seasonings",
                "amount": 2.0,
                "consistency": "solid",
                "id": 1032009,
                "image": "red-pepper-flakes.jpg",
                "measures": {
                    "metric": {
                        "amount": 2.0,
                        "unitLong": "pinches",
                        "unitShort": "pinches"
                    },
                    "us": {
                        "amount": 2.0,
                        "unitLong": "pinches",
                        "unitShort": "pinches"
                    }
                },
                "meta": [
                    "red"
                ],
                "name": "red pepper flakes",
                "original": "couple of pinches red pepper flakes, optional",
                "originalName": "couple of red pepper flakes, optional",
                "unit": "pinches"
            },
            {
                "aisle": "Spices and Seasonings",
                "amount": 2.0,
                "consistency": "solid",
                "id": 1102047,
                "image": "salt-and-pepper.jpg",
                "measures": {
                    "metric": {
                        "amount": 2.0,
                        "unitLong": "servings",
                        "unitShort": "servings"
                    },
                    "us": {
                        "amount": 2.0,
                        "unitLong": "servings",
                        "unitShort": "servings"
                    }
                },
                "meta": [
                    "to taste"
                ],
                "name": "salt and pepper",
                "original": "salt and pepper, to taste",
                "originalName": "salt and pepper, to taste",
                "unit": "servings"
            },
            {
                "aisle": "Produce",
                "amount": 3.0,
                "consistency": "solid",
                "id": 11291,
                "image": "spring-onions.jpg",
                "measures": {
                    "metric": {
                        "amount": 3.0,
                        "unitLong": "",
                        "unitShort": ""
                    },
                    "us": {
                        "amount": 3.0,
                        "unitLong": "",
                        "unitShort": ""
                    }
                },
                "meta": [
                    "white",
                    "green",
                    "separated",
                    "chopped"
                ],
                "name": "scallions",
                "original": "3 scallions, chopped, white and green parts separated",
                "originalName": "scallions, chopped, white and green parts separated",
                "unit": ""
            },
            {
                "aisle": "Alcoholic Beverages",
                "amount": 2.0,
                "consistency": "liquid",
                "id": 14106,
                "image": "white-wine.jpg",
                "measures": {
                    "metric": {
                        "amount": 2.0,
                        "unitLong": "Tbsps",
                        "unitShort": "Tbsps"
                    },
                    "us": {
                        "amount": 2.0,
                        "unitLong": "Tbsps",
                        "unitShort": "Tbsps"
                    }
                },
                "meta": [
                    "white"
                ],
                "name": "white wine",
                "original": "2-3 tbsp white wine",
                "originalName": "white wine",
                "unit": "tbsp"
            },
            {
                "aisle": "Pasta and Rice",
                "amount": 0.25,
                "consistency": "solid",
                "id": 99025,
                "image": "breadcrumbs.jpg",
                "measures": {
                    "metric": {
                        "amount": 59.147,
                        "unitLong": "milliliters",
                        "unitShort": "ml"
                    },
                    "us": {
                        "amount": 0.25,
                        "unitLong": "cups",
                        "unitShort": "cups"
                    }
                },
                "meta": [
                    "whole wheat",
                    "(I used panko)"
                ],
                "name": "whole wheat bread crumbs",
                "original": "1/4 cup whole wheat bread crumbs (I used panko)",
                "originalName": "whole wheat bread crumbs (I used panko)",
                "unit": "cup"
            }
        ],
        "summary": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375\">Cauliflower Gratin with Garlic Breadcrumbs</a>, < href=\"https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437\">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738\">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a>.",
        "winePairing": {
            "pairedWines": [
                "chardonnay",
                "gruener veltliner",
                "sauvignon blanc"
            ],
            "pairingText": "Chardonnay, Gruener Veltliner, and Sauvignon Blanc are great choices for Pasta. Sauvignon Blanc and Gruner Veltliner both have herby notes that complement salads with enough acid to match tart vinaigrettes, while a Chardonnay can be a good pick for creamy salad dressings. The Buddha Kat Winery Chardonnay with a 4 out of 5 star rating seems like a good match. It costs about 25 dollars per bottle.",
            "productMatches": [
                {
                    "id": 469199,
                    "title": "Buddha Kat Winery Chardonnay",
                    "description": "We barrel ferment our Chardonnay and age it in a mix of Oak and Stainless. Giving this light bodied wine modest oak character, a delicate floral aroma, and a warming finish.",
                    "price": "$25.0",
                    "imageUrl": "https://img.spoonacular.com/products/469199-312x231.jpg",
                    "averageRating": 0.8,
                    "ratingCount": 1.0,
                    "score": 0.55,
                    "link": "https://www.amazon.com/2015-Buddha-Kat-Winery-Chardonnay/dp/B00OSAVVM4?tag=spoonacular-20"
                }
            ]
        }
    }
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useLocalStorageState('authTokens', null);
    const [user, setUser] = useLocalStorageState('user',null)
    const [isLoading, setLoading] = useState(true)
    const [meals, setMeals] = useLocalStorageState('meals',null)
    const [recipe, setRecipe] = useLocalStorageState('recipe',null)
    const [favorites, setFavorites] = useLocalStorageState('favorites', null);
    const [favId, setFavId] = useLocalStorageState('favId', [])
    const [error, setError] = useState(null)


    
    const {REACT_APP_API_TOKEN, REACT_APP_BACKEND_URL} = process.env;
    console.log(REACT_APP_BACKEND_URL)
    const url = `${REACT_APP_BACKEND_URL}/api`;
    const headers = {'Content-Type':'application/json'};
 


    const loginUser = async (data) =>{
        console.log(data)
        const body = JSON.stringify({'email':data.email, 'password':data.password})
        console.log(body)
        try{
            let response = await axios(`${url}/token/`,{'method':'POST', 'data':body, headers})
            console.log(response)
            if(response.status === 200){
                let data = response.data;
                setAuthTokens(data);
                console.log(authTokens)
                setUser(jwtDecode(data.access))
                navigate('/')
                return response
            }
            
        }catch(err){
            console.error("API Error:", err.response);
            let message = err;
            setError(message.response.data)
            
        }
    }
    const registerUser = async (data) =>{
        console.log(data)
        const body = JSON.stringify({'username':data.username, 'email':data.email, 'password':data.password})
        console.log(body)
        try{
            let response = await axios(`${url}/register/`,{'method':'POST', 'data':body, headers})
            console.log(response)
            if(response.status === 200){
                navigate('/login')
                return response
            }
            
        }catch(err){
            console.error("API Error:", err.response);
            let message = err;
            console.log(message.response)
            setError(message.response.data)
            
            return message
            // throw Array.isArray(message) ? message : [message];
        }
    }

    const logoutUser = () =>{
        localStorage.clear()
        navigate('/login')
    }

    const getFoodData = async (data) =>{
        
        let formattedIng = data.ingredients.join(', ')
        data['apiKey'] = REACT_APP_API_TOKEN
        const body ={'ingredients':formattedIng, apiKey:data.apiKey}
        

        if(data.test){
        
            setMeals(TEST_RECIPES)
          
            setLoading(false)
            return TEST_RECIPES
        }else{
        try{
            let response = await axios(`https://api.spoonacular.com/recipes/findByIngredients`,{'method':'GET', 'params':body, headers})
            console.log(response)
            if(response.status === 200){
                let data = response.data;
                console.log(data)
                setMeals(data)
            }
            return response
        }catch(err){
            console.error("API Error:", err.response);
            let message = err;
            setMeals(TEST_RECIPES)
            throw Array.isArray(message) ? message : [message];
        }
    }
    }

    const getAllFavoriteRecipes = async (recipeIDs) =>{
        setLoading(true)
        let formatedIDs = recipeIDs.join(',')
        console.log(recipeIDs)
        let apiKey = REACT_APP_API_TOKEN;
        const body ={ids:formatedIDs, apiKey:apiKey}
        console.log("FORMAT ID",formatedIDs)
       
        try{
            let response = await axios("https://api.spoonacular.com/recipes/informationBulk",{'method':'GET', 'params':body, headers})
            console.log(response)
            if(response.status === 200){
                let data = response.data;
               setFavorites(data)
               setLoading(false)
               return response
            }
            
        }catch(err){
            console.error("API Error:", err.response);
          
            let message = err; 
          
            setLoading(false)
            return message;
                    
            }
        
    }

    const getRecipeData = async (data) =>{
     
        data['apiKey'] = REACT_APP_API_TOKEN;
              const body ={id:data.id, apiKey:data.apiKey}
        console.log(data.test)
        if(data.test){
            setRecipe(TEST_SINGLE_RECIPE)
            setLoading(false)
            return
        }


        if(recipe){
            if(recipe.id == data.id){  
                console.log('not called')  
                setLoading(false)
                
                return recipe}
        }
        try{
            let response = await axios(`https://api.spoonacular.com/recipes/${data.id}/information`,{'method':'GET', 'params':body, headers})
            console.log(response)
            if(response.status === 200){
                let data = response.data;
                setRecipe(data)
                setLoading(false)
            }
            return response
        }catch(err){
            console.error("API Error:", err.response);
            let message = err;
            return message
    }

}
let addFavorite = async (data) =>{
    console.log(data)
    const body = JSON.stringify({"recipe_id":data.id,'token':authTokens.access})

   
    try{
        let AuthStr = `Bearer ${String(authTokens.access)}`;
        let response = await axios(`${url}/favorites/add/`,{'method':'POST', 'data':body, headers: {'Content-Type':'application/json', 'Authorization': AuthStr}})

        if(response.status === 200){
            let resp_data = response.data;
            console.log(response)
            console.log(favId)
            setFavId([...favId, data.id])
            return resp_data
        }
        
    }catch(err){
        console.error("API Error:", err.response);
        let message = err;
    
        throw Array.isArray(message) ? message : [message];
       
    }
}
let removeFavorite = async (id) =>{
   
    const body = JSON.stringify({"recipe_id":id,'token':authTokens.access})
   
    console.log(body)
    try{
        let AuthStr = `Bearer ${String(authTokens.access)}`;
        let response = await axios(`${url}/favorites/delete/`,{'method':'POST', 'data':body, headers: {'Content-Type':'application/json', 'Authorization': AuthStr}})

        console.log(favId)
        if(response.status === 200){
           
            let data = response.data;
            console.log("ID", favId)
           
            setFavId(favId.filter(r => r !== id));
       
            return data
        }
        console.log(response)
        return response
    }catch(err){
        console.error("API Error:", err.response);
        let message = err;
    
        throw Array.isArray(message) ? message : [message];
       
    }
}

    let contextData = {
        authTokens:authTokens,
        user:user,
        isLoading:isLoading,
        meals:meals,
        setMeals:setMeals,
        recipe:recipe,
        favorites:favorites,
        favId:favId,
        setLoading:setLoading,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
        getFoodData:getFoodData,
        getRecipeData:getRecipeData,
        addFavorite:addFavorite,
        getAllFavoriteRecipes:getAllFavoriteRecipes,
        removeFavorite:removeFavorite,
        error:error,
        setError:setError,
        setFavId:setFavId,
        
        
    }

    let updateToken = async () =>{
        const body = JSON.stringify({'refresh':authTokens.refresh})
        // let response = awa-it axios({`${url}/refresh/`,{'method':'POST','data':body}
        
        // });
       
        try{
            let response = await axios(`${url}/token/refresh/`,{'method':'POST', 'data':body, headers})

            if(response.status === 200){
                let data = response.data;
               
                setAuthTokens(data);
               
                setUser(jwtDecode(data.access))
            }
            return response
        }catch(err){
            console.error("API Error:", err.response);
            let message = err;
            logoutUser();
            throw Array.isArray(message) ? message : [message];
           
        }
    }
 
    useEffect(()=>{
        console.log('Update Token Called')
        let fourMinutes = 1000 * 6 * 59;
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        },fourMinutes)
        return ()=> clearInterval(interval)
    },[authTokens, isLoading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}