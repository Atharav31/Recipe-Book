const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
        min: 1,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: [String],
        required: true,
    },
    prepTime: {
        type: Number,
        required: true,
        min: 1,
    },
    cookTime: {
        type: Number,
        required: true,
        min: 1,
    },
    totalTime: {
        type: Number,
        required: true,
        min: 1,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
    },
    tags: {
        type: [String],
        default: [],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = { Recipe };
