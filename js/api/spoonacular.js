const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || "demo_key"
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.spoonacular.com/recipes"

// Mock data for development/demo purposes
const MOCK_RECIPES = [
  {
    id: 1,
    title: "Chicken Parmesan",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400",
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
  {
    id: 6,
    title: "Greek Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    readyInMinutes: 15,
    servings: 2,
    missedIngredientCount: 1,
    usedIngredientCount: 5,
  },
  {
    id: 7,
    title: "Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
    readyInMinutes: 35,
    servings: 4,
    missedIngredientCount: 2,
    usedIngredientCount: 3,
  },
  {
    id: 8,
    title: "BBQ Pulled Pork",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    readyInMinutes: 240,
    servings: 8,
    missedIngredientCount: 3,
    usedIngredientCount: 2,
  },
]

const MOCK_RECIPE_DETAILS = {
  1: {
    id: 1,
    title: "Chicken Parmesan",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600",
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
  2: {
    id: 2,
    title: "Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    readyInMinutes: 20,
    servings: 2,
    summary: "A quick and healthy vegetable stir fry loaded with colorful vegetables and a savory sauce.",
    extendedIngredients: [
      { original: "2 cups mixed vegetables (bell peppers, broccoli, carrots)" },
      { original: "2 tablespoons vegetable oil" },
      { original: "3 cloves garlic, minced" },
      { original: "1 tablespoon ginger, grated" },
      { original: "2 tablespoons soy sauce" },
      { original: "1 tablespoon sesame oil" },
    ],
    analyzedInstructions: [
      {
        steps: [
          { step: "Heat oil in a wok or large skillet over high heat." },
          { step: "Add garlic and ginger, stir for 30 seconds." },
          { step: "Add vegetables and stir fry for 5-7 minutes until crisp-tender." },
          { step: "Add soy sauce and sesame oil, toss to combine." },
          { step: "Serve immediately over rice or noodles." },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        { name: "Calories", amount: 220, unit: "kcal", percentOfDailyNeeds: 11 },
        { name: "Fat", amount: 16, unit: "g", percentOfDailyNeeds: 25 },
        { name: "Carbohydrates", amount: 18, unit: "g", percentOfDailyNeeds: 6 },
        { name: "Protein", amount: 4, unit: "g", percentOfDailyNeeds: 8 },
        { name: "Fiber", amount: 5, unit: "g", percentOfDailyNeeds: 20 },
        { name: "Sugar", amount: 6, unit: "g", percentOfDailyNeeds: 7 },
        { name: "Sodium", amount: 720, unit: "mg", percentOfDailyNeeds: 31 },
      ],
    },
  },
  3: {
    id: 3,
    title: "Beef Tacos",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600",
    readyInMinutes: 30,
    servings: 6,
    summary: "Classic beef tacos with seasoned ground beef, fresh toppings, and warm tortillas.",
    extendedIngredients: [
      { original: "1 pound ground beef" },
      { original: "1 packet taco seasoning" },
      { original: "12 taco shells or small tortillas" },
      { original: "1 cup shredded lettuce" },
      { original: "1 cup diced tomatoes" },
      { original: "1/2 cup shredded cheese" },
      { original: "1/4 cup sour cream" },
    ],
    analyzedInstructions: [
      {
        steps: [
          { step: "Brown ground beef in a skillet over medium heat." },
          { step: "Drain excess fat and add taco seasoning with water as directed on package." },
          { step: "Simmer for 5-10 minutes until sauce thickens." },
          { step: "Warm taco shells or tortillas according to package directions." },
          { step: "Fill shells with beef and top with lettuce, tomatoes, cheese, and sour cream." },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        { name: "Calories", amount: 320, unit: "kcal", percentOfDailyNeeds: 16 },
        { name: "Fat", amount: 18, unit: "g", percentOfDailyNeeds: 28 },
        { name: "Carbohydrates", amount: 20, unit: "g", percentOfDailyNeeds: 7 },
        { name: "Protein", amount: 22, unit: "g", percentOfDailyNeeds: 44 },
        { name: "Fiber", amount: 3, unit: "g", percentOfDailyNeeds: 12 },
        { name: "Sugar", amount: 2, unit: "g", percentOfDailyNeeds: 2 },
        { name: "Sodium", amount: 580, unit: "mg", percentOfDailyNeeds: 25 },
      ],
    },
  },
}

export async function searchRecipes(ingredients) {
  // Check if we have a valid API key
  if (API_KEY && API_KEY !== "demo_key") {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        ingredients,
        number: 12,
        ranking: 2,
        ignorePantry: true,
      })

      const response = await fetch(`${BASE_URL}/findByIngredients?${params}`)

      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        console.warn("API call failed, using mock data")
      }
    } catch (error) {
      console.error("Error fetching recipes from API:", error)
    }
  }

  // Fallback to mock data
  await new Promise((resolve) => setTimeout(resolve, 1000))

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
}

export async function getRandomRecipe() {
  // Check if we have a valid API key
  if (API_KEY && API_KEY !== "demo_key") {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        number: 1,
        tags: "main course",
      })

      const response = await fetch(`${BASE_URL}/random?${params}`)

      if (response.ok) {
        const data = await response.json()
        return data.recipes[0]
      } else {
        console.warn("API call failed, using mock data")
      }
    } catch (error) {
      console.error("Error fetching random recipe from API:", error)
    }
  }

  // Fallback to mock data
  await new Promise((resolve) => setTimeout(resolve, 500))
  const randomIndex = Math.floor(Math.random() * MOCK_RECIPES.length)
  const randomRecipeId = MOCK_RECIPES[randomIndex].id

  // Return the detailed mock recipe if available, otherwise return the basic mock recipe
  return MOCK_RECIPE_DETAILS[randomRecipeId] || MOCK_RECIPES[randomIndex]
}

export async function getRecipeById(id) {
  // Check if we have a valid API key
  if (API_KEY && API_KEY !== "demo_key") {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        includeNutrition: true,
      })

      const response = await fetch(`${BASE_URL}/${id}/information?${params}`)

      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        console.warn("API call failed, using mock data")
      }
    } catch (error) {
      console.error("Error fetching recipe details from API:", error)
    }
  }

  // Fallback to mock data
  await new Promise((resolve) => setTimeout(resolve, 800))

  // If we have detailed mock data for this ID, return it
  if (MOCK_RECIPE_DETAILS[id]) {
    return MOCK_RECIPE_DETAILS[id]
  }

  // Otherwise, find the recipe in the basic mock data and enhance it
  const basicRecipe = MOCK_RECIPES.find((recipe) => recipe.id == id)
  if (basicRecipe) {
    return {
      ...basicRecipe,
      summary: `A delicious ${basicRecipe.title} recipe that's perfect for any occasion.`,
      extendedIngredients: [
        { original: "Main ingredients for " + basicRecipe.title },
        { original: "Additional ingredients based on your preference" },
        { original: "Salt and pepper to taste" },
      ],
      analyzedInstructions: [
        {
          steps: [
            { step: "Prepare all ingredients for " + basicRecipe.title },
            { step: "Cook according to your preferred method" },
            { step: "Serve and enjoy!" },
          ],
        },
      ],
      nutrition: {
        nutrients: [
          { name: "Calories", amount: 350, unit: "kcal", percentOfDailyNeeds: 18 },
          { name: "Fat", amount: 15, unit: "g", percentOfDailyNeeds: 23 },
          { name: "Carbohydrates", amount: 30, unit: "g", percentOfDailyNeeds: 10 },
          { name: "Protein", amount: 25, unit: "g", percentOfDailyNeeds: 50 },
        ],
      },
    }
  }

  // If all else fails, return the first mock recipe detail
  return MOCK_RECIPE_DETAILS[1]
}
