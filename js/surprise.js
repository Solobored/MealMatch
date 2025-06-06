import { getRandomRecipe } from "./api/spoonacular.js"

document.addEventListener("DOMContentLoaded", () => {
  initializePage()
})

function initializePage() {
  initMobileMenu()
  setupSurpriseButton()
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

function setupSurpriseButton() {
  const surpriseBtn = document.getElementById("surprise-btn")
  const resultContainer = document.getElementById("surprise-result")

  if (!surpriseBtn || !resultContainer) return

  surpriseBtn.addEventListener("click", async () => {
    try {
      surpriseBtn.disabled = true
      surpriseBtn.innerHTML = '<span class="surprise-icon">🎲</span> Finding Recipe...'
      showLoading()

      const recipe = await getRandomRecipe()
      hideLoading()

      // Ensure we have an image URL, use a placeholder if not
      const imageUrl = recipe.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600"

      // Format the summary text, removing HTML tags and limiting length
      const summaryText = recipe.summary
        ? recipe.summary.replace(/<[^>]*>/g, "").substring(0, 250) + "..."
        : "A delicious surprise recipe for you to try!"

      resultContainer.innerHTML = `
        <div class="recipe-detail-card">
          <img src="${imageUrl}" alt="${recipe.title}" class="recipe-image">
          <div class="recipe-info">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
              <span>⏱️ Ready in ${recipe.readyInMinutes || "N/A"} minutes</span>
              <span>🍽️ Servings: ${recipe.servings || "N/A"}</span>
              <span>🔥 Calories: ${recipe.nutrition?.nutrients?.find((n) => n.name === "Calories")?.amount || "N/A"} kcal</span>
            </div>
            <div class="recipe-summary">${summaryText}</div>
            <a href="./recipe.html?id=${recipe.id}" class="btn-primary">View Full Recipe</a>
          </div>
        </div>
      `
    } catch (error) {
      hideLoading()
      showError("Failed to get a random recipe. Please try again.")
      console.error("Error getting surprise recipe:", error)
    } finally {
      surpriseBtn.disabled = false
      surpriseBtn.innerHTML = '<span class="surprise-icon">🎲</span> Surprise Me!'
    }
  })
}

function showLoading() {
  const loadingElement = document.getElementById("loading")
  const resultContainer = document.getElementById("surprise-result")

  if (loadingElement) loadingElement.classList.remove("hidden")
  if (resultContainer) resultContainer.innerHTML = ""
}

function hideLoading() {
  const loadingElement = document.getElementById("loading")
  if (loadingElement) loadingElement.classList.add("hidden")
}

function showError(message) {
  const errorElement = document.getElementById("error-message")
  const resultContainer = document.getElementById("surprise-result")

  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.remove("hidden")
    setTimeout(() => errorElement.classList.add("hidden"), 5000)
  }

  if (resultContainer) resultContainer.innerHTML = ""
}
