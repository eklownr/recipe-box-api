import express from 'express';

const app = express();
app.use(express.json());
const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`Server is running: ${PORT}`)
})

let recipes = [
    {id: 1, name: "American Pancakes", cuisine: "USA", prepTime: "15 min" },
    {id: 2, name: "Fattiga riddare", cuisine: "Sweden", prepTime: "20 min" },
    {id: 3, name: "Flygande Jackob", cuisine: "Sweden", prepTime: "35 min" },
    {id: 4, name: "Tunnbröd bröd", cuisine: "Sweden", prepTime: "90 min" },
];

app.get("/recipes", (req, res) => {
    res.json(recipes)
});

app.get("/recipes/:id", (req, res) => {
    const recipeId = parseInt(req.params.id);
    const recipe = recipes.filter((r) => r.id === recipeId)
    console.log(recipe);
    
        if (!recipe) {
            return res.status(404).json({massage: `Recipe with id ${recipeId} not fund!`})
        }
        res.json(recipe) // return the resipie with id === resipiesId
});