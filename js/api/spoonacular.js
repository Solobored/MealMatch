const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || "demo_key"
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.spoonacular.com/recipes"

// Mock data for development/demo purposes
const MOCK_RECIPES = [
  {
    id: 1,
    title: "Chicken Parmesan",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    readyInMinutes: 45,
    servings: 4,
    missedIngredientCount: 2,
    usedIngredientCount: 3,
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    readyInMinutes: 20,
    servings: 2,
    missedIngredientCount: 1,
    usedIngredientCount: 4,
  },
  {
    id: 3,
    title: "Beef Tacos",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400",
    readyInMinutes: 30,
    servings: 6,
    missedIngredientCount: 3,
    usedIngredientCount: 2,
  },
  {
    id: 4,
    title: "Salmon with Herbs",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    readyInMinutes: 25,
    servings: 2,
    missedIngredientCount: 1,
    usedIngredientCount: 3,
  },
  {
    id: 5,
    title: "Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    readyInMinutes: 20,
    servings: 4,
    missedIngredientCount: 2,
    usedIngredientCount: 4,
  },
]

const MOCK_RECIPE_DETAILS = {
  1: {
    id: 1,
    title: "Chicken Parmesan",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600",
    readyInMinutes: 45,
    servings: 4,
    summary:
      "A delicious Italian-American dish featuring breaded chicken breast topped with marinara sauce and melted cheese.",
    extendedIngredients: [
      { original: "4 boneless, skinless chicken breasts" },
      { original: "1 cup breadcrumbs" },
      { original: "1/2 cup grated Parmesan cheese" },
      { original: "2 cups marinara sauce" },
      { original: "1 cup mozzarella cheese, shredded" },
    ],
    analyzedInstructions: [
      {
        steps: [
          { step: "Preheat oven to 425°F (220°C)." },
          { step: "Pound chicken breasts to even thickness." },
          { step: "Mix breadcrumbs and Parmesan cheese." },
          { step: "Coat chicken in breadcrumb mixture." },
          { step: "Bake for 20 minutes, then top with sauce and cheese." },
          { step: "Bake additional 10 minutes until cheese melts." },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        { name: "Calories", amount: 485, unit: "kcal", percentOfDailyNeeds: 24 },
        { name: "Fat", amount: 18, unit: "g", percentOfDailyNeeds: 28 },
        { name: "Carbohydrates", amount: 25, unit: "g", percentOfDailyNeeds: 8 },
        { name: "Protein", amount: 52, unit: "g", percentOfDailyNeeds: 104 },
        { name: "Fiber", amount: 3, unit: "g", percentOfDailyNeeds: 12 },
        { name: "Sugar", amount: 8, unit: "g", percentOfDailyNeeds: 9 },
        { name: "Sodium", amount: 890, unit: "mg", percentOfDailyNeeds: 39 },
      ],
    },
  },
}

export async function searchRecipes(ingredients) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, filter mock data based on ingredients
    const ingredientList = ingredients
      .toLowerCase()
      .split(",")
      .map((i) => i.trim())
    const filteredRecipes = MOCK_RECIPES.filter((recipe) => {
      return ingredientList.some(
        (ingredient) =>
          recipe.title.toLowerCase().includes(ingredient) ||
          (ingredient === "chicken" && recipe.title.toLowerCase().includes("chicken")) ||
          (ingredient === "vegetable" && recipe.title.toLowerCase().includes("vegetable")) ||
          (ingredient === "beef" && recipe.title.toLowerCase().includes("beef")) ||
          (ingredient === "salmon" && recipe.title.toLowerCase().includes("salmon")) ||
          (ingredient === "pasta" && recipe.title.toLowerCase().includes("pasta")),
      )
    })

    return filteredRecipes.length > 0 ? filteredRecipes : MOCK_RECIPES

    const params = new URLSearchParams({
      apiKey: API_KEY,
      ingredients,
      number: 12,
      ranking: 2,
      ignorePantry: true
    });

    const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();

  } catch (error) {
    console.error("Error fetching recipes:", error)
    return MOCK_RECIPES
  }
}

export async function getRandomRecipe() {
  try {
    // Return random mock recipe
    const randomIndex = Math.floor(Math.random() * MOCK_RECIPES.length)
    return MOCK_RECIPES[randomIndex]


    const params = new URLSearchParams({
      apiKey: API_KEY,
      number: 1,
      tags: 'main course'
    });

    const response = await fetch(`${BASE_URL}/random?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.recipes[0];

  } catch (error) {
    console.error("Error fetching random recipe:", error)
    return MOCK_RECIPES[0]
  }
}

export async function getRecipeById(id) {
  try {
    // Return mock recipe details
    return MOCK_RECIPE_DETAILS[id] || MOCK_RECIPE_DETAILS[1]


    const params = new URLSearchParams({
      apiKey: API_KEY,
      includeNutrition: true
    });

    const response = await fetch(`${BASE_URL}/${id}/information?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
 
  } catch (error) {
    console.error("Error fetching recipe details:", error)
    return MOCK_RECIPE_DETAILS[1]
  }
}
