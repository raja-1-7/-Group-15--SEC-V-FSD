import React, { useState } from "react";
import CustomImage from "./CustomImage";

export default function RecipeCard({ recipe, onDelete, onEdit }) {
  const [showDetails, setShowDetails] = useState(false); // Control whether the recipe details are shown
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing
  const [updatedRecipe, setUpdatedRecipe] = useState({
    title: recipe.title,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    image: recipe.image,
  });

  // Toggle visibility of recipe details
  const handleViewRecipeClick = () => {
    setShowDetails((prevState) => !prevState);
  };

  // Handle changes in input fields when editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit the edited recipe
  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(updatedRecipe); // Update recipe with new data
    setIsEditing(false); // Exit edit mode
  };

  // Toggle between edit mode and view mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="recipe-card">
      <CustomImage imgSrc={recipe.image || "/img/gallery/default.jpg"} pt="65%" />
      <div className="recipe-card-info">
        {/* Recipe Title */}
        {isEditing ? (
          // Show form to edit recipe when in editing mode
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={updatedRecipe.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="ingredients"
              value={updatedRecipe.ingredients}
              onChange={handleChange}
              required
            />
            <textarea
              name="steps"
              value={updatedRecipe.steps}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image"
              value={updatedRecipe.image}
              onChange={handleChange}
              required
            />
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <>
            <p className="recipe-title">{recipe.title}</p>
            {/* Show Ingredients and Steps when 'View Recipe' button is clicked */}
            {showDetails && (
              <>
                <div className="recipe-ingredients">
                  <strong>Ingredients:</strong>
                  <ul>
                    {Array.isArray(recipe.ingredients)
                      ? recipe.ingredients.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      : recipe.ingredients}
                  </ul>
                </div>

                <div className="recipe-steps">
                  <strong>Steps:</strong>
                  <ul>
                    {Array.isArray(recipe.steps)
                      ? recipe.steps.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      : recipe.steps}
                  </ul>
                </div>
              </>
            )}
            <button className="view-btn" onClick={handleViewRecipeClick}>
              {showDetails ? "Hide Recipe" : "View Recipe"}
            </button>
          </>
        )}
      </div>

      {/* Delete and Edit Buttons */}
      <div className="recipe-card-buttons">
        <button onClick={() => onDelete(recipe.id)}>Delete</button>
        {!isEditing && <button onClick={toggleEdit}>Edit</button>}
      </div>
    </div>
  );
}
