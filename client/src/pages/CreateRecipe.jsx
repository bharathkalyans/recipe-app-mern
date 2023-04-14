import React, { useState } from "react";
import axios from "axios";

import { BASE_RECIPE_API_URL } from "../utils/constants.js";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({
      ...recipe,
      ingredients,
    });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_RECIPE_API_URL}`, recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe Created! 🍔");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients</label>

        {recipe.ingredients.map((ingredient, idx) => (
          <input
            required
            key={idx}
            name={ingredient}
            type="text"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          required
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          required
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          required
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
