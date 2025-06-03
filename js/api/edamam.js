const EDAMAM_APP_ID = import.meta.env.VITE_EDAMAM_APP_ID || "demo_id"
const EDAMAM_APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY || "demo_key"
const BASE_URL = import.meta.env.VITE_EDAMAM_BASE_URL || "https://api.edamam.com/api/nutrition-details"

// Mock nutrition data for demo
const MOCK_NUTRITION = {
  calories: 485,
  totalWeight: 350,
  dietLabels: ["Low-Sodium"],
  healthLabels: ["Sugar-Conscious", "Kidney-Friendly"],
  totalNutrients: {
    ENERC_KCAL: { label: "Energy", quantity: 485, unit: "kcal" },
    FAT: { label: "Fat", quantity: 18, unit: "g" },
    FASAT: { label: "Saturated", quantity: 6, unit: "g" },
    CHOCDF: { label: "Carbs", quantity: 25, unit: "g" },
    FIBTG: { label: "Fiber", quantity: 3, unit: "g" },
    SUGAR: { label: "Sugars", quantity: 8, unit: "g" },
    PROCNT: { label: "Protein", quantity: 52, unit: "g" },
    NA: { label: "Sodium", quantity: 890, unit: "mg" },
  },
}

export async function analyzeRecipe(recipeText) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, return mock data with some variation
    const lines = recipeText.split("\n").filter((line) => line.trim())
    const ingredientCount = lines.length

    // Simulate different nutrition based on ingredient count
    const mockData = {
      ...MOCK_NUTRITION,
      calories: Math.round(MOCK_NUTRITION.calories * (ingredientCount / 5)),
      totalNutrients: {
        ...MOCK_NUTRITION.totalNutrients,
        ENERC_KCAL: {
          ...MOCK_NUTRITION.totalNutrients.ENERC_KCAL,
          quantity: Math.round(MOCK_NUTRITION.calories * (ingredientCount / 5)),
        },
      },
    }

    return mockData


    const ingredients = recipeText.split('\n').filter(line => line.trim());
    
    const response = await fetch(`${BASE_URL}?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingr: ingredients })
    });
    
    if (!response.ok) throw new Error('Nutrition analysis failed');
    return await response.json();

  } catch (error) {
    console.error("Error analyzing recipe:", error)
    return MOCK_NUTRITION
  }
}
