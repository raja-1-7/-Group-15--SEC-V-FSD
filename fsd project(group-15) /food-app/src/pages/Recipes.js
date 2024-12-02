import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar"; // Import the Navbar component

export default function Recipes() {
  const [recipes, setRecipes] = useState([]); // State to manage recipes
  const [loading, setLoading] = useState(true);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    image: "",
    ingredients: "",
    steps: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  // Fetch recipes from db.json (Read Operation)
  useEffect(() => {
    fetch("http://localhost:5001/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.sort(() => Math.random() - 0.5)); // Shuffle recipes
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a new recipe (Create Operation)
  const addRecipe = () => {
    if (newRecipe.title && newRecipe.image) {
      fetch("http://localhost:5001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe), // Send all fields including ingredients and steps
      })
        .then((response) => response.json())
        .then((data) => {
          setRecipes((prevRecipes) => [...prevRecipes, data]);

          // Reset the form fields
          setNewRecipe({
            title: "",
            image: "",
            ingredients: "",
            steps: "",
          });
        })
        .catch((error) => console.error("Error adding recipe:", error));
    } else {
      alert("Please provide both title and image URL.");
    }
  };

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  // Update a recipe (Update Operation)
  const updateRecipe = (updatedRecipe) => {
    fetch(`http://localhost:5001/recipes/${updatedRecipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? data : recipe
          )
        );
      })
      .catch((error) => console.error("Error updating recipe:", error));
  };

  // Delete a recipe (Delete Operation)
  const deleteRecipe = (id) => {
    fetch(`http://localhost:5001/recipes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  return (
    <div>
      {/* Include Navbar component here */}
      <Navbar /> {/* Navbar should now appear on top */}

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="recipes-container">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={() => deleteRecipe(recipe.id)}
            onEdit={(updatedData) => updateRecipe({ ...recipe, ...updatedData })}
          />
        ))}
      </div>

      {/* Form to add a new recipe */}
      <div className="add-recipe-form">
        <h3>Add New Recipe</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addRecipe();
          }}
        >
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newRecipe.title}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={newRecipe.image}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Ingredients:
            <textarea
              name="ingredients"
              value={newRecipe.ingredients}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Steps:
            <textarea
              name="steps"
              value={newRecipe.steps}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}
