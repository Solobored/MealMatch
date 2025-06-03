import { searchRecipes } from "../api/spoonacular.js"
import { renderRecipeCards, showLoading, showError, hideLoading } from "./ui.js"

export function setupSearch() {
  const searchForm = document.getElementById("search-form")
  if (!searchForm) return

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const ingredients = document.getElementById("ingredients").value.trim()
    const submitButton = searchForm.querySelector('button[type="submit"]')

    if (!ingredients) {
      showError("recipe-results", "Please enter some ingredients to search for recipes.")
      return
    }

    try {
      submitButton.disabled = true
      submitButton.innerHTML = "<span>🔍</span> Searching..."
      showLoading("recipe-results")

      const recipes = await searchRecipes(ingredients)
      hideLoading("recipe-results")
      renderRecipeCards(recipes)
    } catch (error) {
      hideLoading("recipe-results")
      showError("recipe-results", "Failed to search recipes. Please try again.")
      console.error("Error searching recipes:", error)
    } finally {
      submitButton.disabled = false
      submitButton.innerHTML = "<span>🔍</span> Find Recipes"
    }
  })
}
