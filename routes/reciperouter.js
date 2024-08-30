// Example reciperouter.js
const express = require('express');
const reciperouter = express.Router();
const { handleCreateRecipe, handleGetRecipes, handleUpdateRecipe, handleDeleteRecipe,handleGetAllRecipes } = require('../controller/recipe');

reciperouter.post('/recipes', handleCreateRecipe);
reciperouter.get('/createres', handleCreateRecipe);
reciperouter.get('/recipes', handleGetRecipes);
reciperouter.get('/home', handleGetAllRecipes);
reciperouter.put('/recipe/update/:id', handleUpdateRecipe);
reciperouter.delete('/recipe/delete/:id', handleDeleteRecipe);

module.exports = { reciperouter };
