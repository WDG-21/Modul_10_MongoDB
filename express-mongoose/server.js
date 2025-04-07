import express from 'express';
import cors from 'cors';

import initDb from './db/index.js';
import Recipe from './models/Recipe.js';
// import User from './models/User.js';

const port = process.env.PORT || 8000;
const app = express();

await initDb();

// CORS - cross origin resource policy
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Running' });
});

// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.json({ data: users });
// });

app.post('/recipes', async (req, res) => {
  const recipe = await Recipe.create(req.body);
  // console.log(recipe);
  res.status(201).json({ message: 'Recipe created', data: recipe });
});

app.get('/recipes', async (req, res) => {
  const { page } = req.query;
  const skip = parseInt(page) ?? 0;
  const recipes = await Recipe.find().skip(skip).limit(10).lean();
  res.json({ data: recipes });
});

app.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id).lean();

  if (!recipe) throw new Error('Recipe not found', 404);
  res.json({ data: recipe });
});

app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  // const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  const recipe = await Recipe.findById(id);
  if (!recipe) throw new Error('Recipe not found', 404);

  recipe.ingredients.push({ name: 'Salz', quantity: 5 });
  await recipe.save();

  res.json({ data: recipe });
});

app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findByIdAndDelete(id, { new: true }).lean();
  if (!recipe) throw new Error('Recipe not found', 404);
  res.json({ data: recipe });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => console.log(` Server listening on port ${port}`));
