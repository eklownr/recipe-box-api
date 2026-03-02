import express from "express";

const app = express();
app.use(express.json());

const PORT: number = 3000;

app.listen(PORT, () => {
	console.log(`Server is running: ${PORT}`);
});

type Recipe = {
	id: number;
	name: string;
	cuisine: string;
	prepTime: string;
};

let recipes: Recipe[] = [
	{ id: 1, name: "American Pancakes", cuisine: "USA", prepTime: "15 min" },
	{ id: 2, name: "Fattiga riddare", cuisine: "Sweden", prepTime: "20 min" },
	{ id: 3, name: "Flygande Jackob", cuisine: "Sweden", prepTime: "35 min" },
	{ id: 4, name: "Tunnbröd bröd", cuisine: "Sweden", prepTime: "90 min" },
];

// response with all recipes
app.get("/recipes", (req, res) => {
	res.json(recipes);
});

// response recipe with id
app.get("/recipes/:id", (req, res) => {
	const recipeId = parseInt(req.params.id);
	const recipe = recipes.filter((r) => r.id === recipeId);
	if (!recipe || recipe.length === 0) {
		return res
			.status(404)
			.json({ message: `Recipe with id ${recipeId} not fund!` });
	}
	res.json(recipe); // return the resipe with id === resipesId
});

// add new recipe
app.post("/recipe", (req, res) => {
	const newRecipe: Recipe = {
		id: recipes.length + 1,
		name: "Ramen",
		cuisine: "Japan",
		prepTime: "5 min",
	};
	recipes.push(newRecipe);
	res.json({ message: `New recipe is added: ${newRecipe.name}!` });
});

// update recipe by id
app.put("/recipe/:id", (req, res) => {
	const recipeId = parseInt(req.params.id);
	const recipe = recipes.find((r) => r.id === recipeId);
	if (!recipe) {
		return res
			.status(404)
			.json({ message: `Recipe with id ${recipeId} not fund!` });
	}
	recipe.name = req.body.name || recipe.name;
	recipe.cuisine = req.body.cuisine || recipe.cuisine;
	recipe.prepTime = req.body.prepTime || recipe.prepTime;
	res.json({ message: `Recipe with id ${recipeId} is updated!` });
});

// delete recipe by id
app.delete("/recipe/:id", (req, res) => {
	const recipeId = parseInt(req.params.id);
	recipes = recipes.filter((r) => r.id !== recipeId);
	res.json({ message: `Recipe with id ${recipeId} is deleted!` });
});
