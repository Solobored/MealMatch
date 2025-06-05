export function setupUI() {
  // Initialize any UI components that need setup
  console.log("UI initialized")
}

export function renderRecipeCards(recipes) {
  const resultsContainer = document.getElementById("recipe-results")
  if (!resultsContainer) return

  if (!recipes || recipes.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <h3>No recipes found</h3>
        <p>Try different ingredients or check your spelling</p>
      </div>
    `
    return
  }

  resultsContainer.innerHTML = recipes
    .map(
      (recipe) => `
    <article class="recipe-card" onclick="window.location.href='./recipe.html?id=${recipe.id}'">
      <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
      <div class="recipe-card-content">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          <span>⏱️ ${recipe.readyInMinutes || "N/A"} mins</span>
          <span>🍽️ ${recipe.servings || "N/A"} servings</span>
        </div>
        ${recipe.missedIngredientCount ? `<p class="missing-ingredients">Missing ${recipe.missedIngredientCount} ingredients</p>` : ""}
        <button class="view-recipe-btn" onclick="event.stopPropagation(); window.location.href='./recipe.html?id=${recipe.id}'">
          View Recipe
        </button>
      </div>
    </article>
  `,
    )
    .join("")
}

export function renderMealPlan(mealPlan) {
  const mealPlanContainer = document.getElementById("meal-plan")
  if (!mealPlanContainer) return

  mealPlanContainer.innerHTML = mealPlan.days
    .map(
      (day) => `
    <div class="day-plan">
      <h3>Day ${day.day}</h3>
      <div class="meals-grid">
        <div class="meal">
          <h4>🌅 Breakfast</h4>
          <img src="${day.meals.breakfast.image}" alt="${day.meals.breakfast.title}">
          <p>${day.meals.breakfast.title}</p>
          <button onclick="window.location.href='./recipe.html?id=${day.meals.breakfast.id}'" class="view-recipe-btn">
            View Recipe
          </button>
        </div>
        <div class="meal">
          <h4>☀️ Lunch</h4>
          <img src="${day.meals.lunch.image}" alt="${day.meals.lunch.title}">
          <p>${day.meals.lunch.title}</p>
          <button onclick="window.location.href='./recipe.html?id=${day.meals.lunch.id}'" class="view-recipe-btn">
            View Recipe
          </button>
        </div>
        <div class="meal">
          <h4>🌙 Dinner</h4>
          <img src="${day.meals.dinner.image}" alt="${day.meals.dinner.title}">
          <p>${day.meals.dinner.title}</p>
          <button onclick="window.location.href='./recipe.html?id=${day.meals.dinner.id}'" class="view-recipe-btn">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

export function showLoading(containerId) {
  const container = document.getElementById(containerId)
  const loadingElement = document.getElementById("loading")

  if (container) {
    container.innerHTML = ""
  }

  if (loadingElement) {
    loadingElement.classList.remove("hidden")
  }
}

export function hideLoading(containerId) {
  const loadingElement = document.getElementById("loading")

  if (loadingElement) {
    loadingElement.classList.add("hidden")
  }
}

export function showError(containerId, message) {
  const container = document.getElementById(containerId)
  const errorElement = document.getElementById("error-message")

  if (container) {
    container.innerHTML = ""
  }

  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.remove("hidden")

    // Hide error after 5 seconds
    setTimeout(() => {
      errorElement.classList.add("hidden")
    }, 5000)
  }
}
