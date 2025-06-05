import { getRandomRecipe } from "../api/spoonacular.js"

export async function generateMealPlan(days) {
  const mealPlan = {
    days: [],
    generatedAt: new Date().toISOString(),
  }

  for (let i = 0; i < days; i++) {
    // Add small delays to avoid hitting API rate limits
    const breakfast = await getRandomRecipe()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const lunch = await getRandomRecipe()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const dinner = await getRandomRecipe()
    await new Promise((resolve) => setTimeout(resolve, 100))

    mealPlan.days.push({
      day: i + 1,
      meals: {
        breakfast: {
          id: breakfast.id,
          title: breakfast.title,
          image: breakfast.image,
        },
        lunch: {
          id: lunch.id,
          title: lunch.title,
          image: lunch.image,
        },
        dinner: {
          id: dinner.id,
          title: dinner.title,
          image: dinner.image,
        },
      },
    })
  }

  localStorage.setItem("mealPlan", JSON.stringify(mealPlan))
  return mealPlan
}

export function getMealPlan() {
  try {
    return JSON.parse(localStorage.getItem("mealPlan") || "null")
  } catch (error) {
    console.error("Error getting meal plan:", error)
    return null
  }
}

export function clearMealPlan() {
  try {
    localStorage.removeItem("mealPlan")
    return true
  } catch (error) {
    console.error("Error clearing meal plan:", error)
    return false
  }
}
