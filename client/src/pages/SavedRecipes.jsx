import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_RECIPE_API_URL } from "../utils/constants";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const userID = useGetUserID();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${BASE_RECIPE_API_URL}`);
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {recipes.map(
          (recipe) =>
            savedRecipes.includes(recipe._id) && (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                </div>

                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default SavedRecipes;
