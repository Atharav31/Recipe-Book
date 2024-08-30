const { Recipe } = require("../models/recipe");

// Create new recipe
const handleCreateRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    prepTime,
    cookTime,
    totalTime,
    difficulty,
    tags,
    servings,
    category,
  } = req.body;

  try {
    const newRecipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      category,
      prepTime,
      cookTime,
      totalTime,
      difficulty,
      tags,
      createdBy: req.user._id, // Assuming req.user is populated with the logged-in user's ID
    });

    return res.status(201).render("createrecipe");
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get all recipes
const handleGetRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id });
    return res.status(200).render("viewrecipe",{recipes});
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
const handleGetAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ });
    return res.status(200).render("home",{recipes});
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ error: "Server error" });
  }
  
}

// Update a recipe
const handleUpdateRecipe = async (req, res) => {
  console.log("upadte");
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Delete a recipe
const handleDeleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    return res.status(200).json({ msg: "Recipe deleted" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  handleCreateRecipe,
  handleGetRecipes,
  handleUpdateRecipe,
  handleDeleteRecipe,handleGetAllRecipes
};
