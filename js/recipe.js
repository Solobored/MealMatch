import { getRecipeById } from "./api/spoonacular.js"
import { getFavorites, addToFavorites, removeFromFavorites, addToShoppingList } from "./modules/favorites.js"

document.addEventListener("DOMContentLoaded", () => {
  initializePage()
})

async function initializePage() {
  // Initialize mobile menu
  initMobileMenu()

  // Get recipe ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const recipeId = urlParams.get("id")

  if (recipeId) {
    await loadRecipeDetails(recipeId)
    initializeFavoriteButton(recipeId)
    initializeShoppingListButton()
  } else {
    showError("Recipe ID not found. Please go back and select a recipe.")
  }
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
    })
  }
}

async function loadRecipeDetails(recipeId) {
  const loadingElement = document.getElementById("loading")
  const errorElement = document.getElementById("error-message")
  const recipeContainer = document.getElementById("recipe-container")

  try {
    showLoading()

    const recipe = await getRecipeById(recipeId)

    if (recipe) {
      displayRecipeDetails(recipe)
      recipeContainer.classList.remove("hidden")
    } else {
      showError("Unable to load recipe details. Please try again later.")
    }
  } catch (error) {
    console.error("Error loading recipe details:", error)
    showError("An error occurred while loading the recipe. Please try again later.")
  } finally {
    hideLoading()
  }
}

function displayRecipeDetails(recipe) {
  // Set recipe image
  const recipeImage = document.getElementById("recipe-image")
  recipeImage.src = recipe.image || "/placeholder.svg?height=400&width=600"
  recipeImage.alt = recipe.title

  // Set recipe title
  document.getElementById("recipe-title").textContent = recipe.title

  // Set recipe meta information
  document.querySelector(".time-value").textContent = recipe.readyInMinutes || "N/A"
  document.querySelector(".servings-value").textContent = recipe.servings || "N/A"

  // Set recipe summary
  const summaryElement = document.getElementById("recipe-summary")
  if (recipe.summary) {
    summaryElement.innerHTML = recipe.summary.replace(/<[^>]*>/g, "") // Strip HTML tags
  } else {
    summaryElement.textContent = "No description available."
  }

  // Set ingredients
  displayIngredients(recipe.extendedIngredients || [])

  // Set instructions
  displayInstructions(recipe.analyzedInstructions || [], recipe.instructions)

  // Set nutrition facts
  displayNutrition(recipe.nutrition)
}

function displayIngredients(ingredients) {
  const ingredientsList = document.getElementById("ingredients-list")

  if (ingredients.length === 0) {
    ingredientsList.innerHTML = "<li>No ingredients available</li>"
    return
  }

  ingredientsList.innerHTML = ingredients.map((ingredient) => `<li>${ingredient.original}</li>`).join("")
}

function displayInstructions(analyzedInstructions, rawInstructions) {
  const instructionsContainer = document.getElementById("instructions-container")

  if (analyzedInstructions.length > 0 && analyzedInstructions[0].steps) {
    const steps = analyzedInstructions[0].steps
    instructionsContainer.innerHTML = `
      <ol>
        ${steps.map((step) => `<li>${step.step}</li>`).join("")}
      </ol>
    `
  } else if (rawInstructions) {
    instructionsContainer.innerHTML = `<div>${rawInstructions}</div>`
  } else {
    instructionsContainer.innerHTML = "<p>No instructions available</p>"
  }
}

function displayNutrition(nutrition) {
  const nutritionContainer = document.getElementById("nutrition-container")

  if (!nutrition || !nutrition.nutrients) {
    nutritionContainer.innerHTML = "<p>Nutrition information not available</p>"
    return
  }

  const mainNutrients = ["Calories", "Fat", "Carbohydrates", "Protein", "Fiber", "Sugar", "Sodium"]
  const relevantNutrients = nutrition.nutrients.filter((nutrient) => mainNutrients.includes(nutrient.name))

  nutritionContainer.innerHTML = relevantNutrients
    .map(
      (nutrient) => `
    <div class="nutrition-item">
      <div class="nutrient-name">${nutrient.name}</div>
      <div class="nutrient-amount">${nutrient.amount} ${nutrient.unit}</div>
      <div class="nutrient-daily">${nutrient.percentOfDailyNeeds ? Math.round(nutrient.percentOfDailyNeeds) + "% DV" : ""}</div>
    </div>
  `,
    )
    .join("")
}

function initializeFavoriteButton(recipeId) {
  const favoriteBtn = document.getElementById("favorite-btn")

  if (!favoriteBtn) return

  updateFavoriteButtonState(recipeId)

  favoriteBtn.addEventListener("click", () => {
    toggleFavorite(recipeId)
  })
}

function updateFavoriteButtonState(recipeId) {
  const favoriteBtn = document.getElementById("favorite-btn")
  const favorites = getFavorites()
  const isFavorited = favorites.some((fav) => fav.id == recipeId)

  if (isFavorited) {
    favoriteBtn.classList.add("favorited")
    favoriteBtn.querySelector(".heart").textContent = "❤️"
    favoriteBtn.querySelector(".text").textContent = "Remove from Favorites"
  } else {
    favoriteBtn.classList.remove("favorited")
    favoriteBtn.querySelector(".heart").textContent = "🤍"
    favoriteBtn.querySelector(".text").textContent = "Add to Favorites"
  }
}

function toggleFavorite(recipeId) {
  const favorites = getFavorites()
  const isFavorited = favorites.some((fav) => fav.id == recipeId)

  if (isFavorited) {
    removeFromFavorites(recipeId)
  } else {
    const recipeTitle = document.getElementById("recipe-title").textContent
    const recipeImage = document.getElementById("recipe-image").src

    addToFavorites({
      id: recipeId,
      title: recipeTitle,
      image: recipeImage,
    })
  }

  updateFavoriteButtonState(recipeId)
}

function initializeShoppingListButton() {
  const shoppingListBtn = document.getElementById("shopping-list-btn")

  if (!shoppingListBtn) return

  shoppingListBtn.addEventListener("click", () => {
    const ingredients = Array.from(document.querySelectorAll("#ingredients-list li")).map((li) => li.textContent)

    addToShoppingList(ingredients)

    // Show feedback
    shoppingListBtn.textContent = "✅ Added to Shopping List"
    setTimeout(() => {
      shoppingListBtn.textContent = "🛒 Add to Shopping List"
    }, 2000)
  })
}

function showLoading() {
  document.getElementById("loading").classList.remove("hidden")
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden")
}

function showError(message) {
  const errorElement = document.getElementById("error-message")
  errorElement.textContent = message
  errorElement.classList.remove("hidden")
}
