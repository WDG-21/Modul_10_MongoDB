import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  ingredients: {
    type: [
      {
        name: String,
        quantity: Number,
      },
    ],
  },

  instructions: {
    type: String,
    maxLength: 7000,
  },

  prepTime: {
    type: Number,
  },
});

const Recipe = model('recipe', recipeSchema);
export default Recipe;
