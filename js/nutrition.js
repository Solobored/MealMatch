import { analyzeRecipe } from "./api/edamam.js"

document.addEventListener("DOMContentLoaded", () => {
  initializePage()
})

function initializePage() {
  initMobileMenu()
  setupNutritionForm()
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

function setupNutritionForm() {
  const nutritionForm = document.getElementById("nutrition-form")

  if (!nutritionForm) return

  nutritionForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const recipeInput = document.getElementById("recipe-input")
    const submitButton = nutritionForm.querySelector('button[type="submit"]')
    const recipeText = recipeInput.value.trim()

    if (!recipeText) {
      showError("Please enter a recipe to analyze.")
      return
    }

    try {
      submitButton.disabled = true
      submitButton.textContent = "Analyzing..."
      showLoading()

      const nutritionData = await analyzeRecipe(recipeText)
      hideLoading()
      displayNutritionResults(nutritionData)
    } catch (error) {
      hideLoading()
      showError("Failed to analyze recipe. Please try again.")
      console.error("Error analyzing recipe:", error)
    } finally {
      submitButton.disabled = false
      submitButton.textContent = "Analyze Recipe"
    }
  })
}

function displayNutritionResults(data) {
  const resultsContainer = document.getElementById("nutrition-results")

  if (!resultsContainer) return

  const nutrients = data.totalNutrients

  resultsContainer.innerHTML = `
    <div class="nutrition-summary">
      <h3>📊 Nutrition Analysis Results</h3>
      <div class="calories-highlight">
        <span class="calories-number">${Math.round(nutrients.ENERC_KCAL?.quantity || 0)}</span>
        <span class="calories-label">Calories</span>
      </div>
    </div>

    <div class="macros-grid">
      <div class="macro-item">
        <div class="macro-icon">🥩</div>
        <div class="macro-info">
          <div class="macro-name">Protein</div>
          <div class="macro-amount">${Math.round(nutrients.PROCNT?.quantity || 0)}g</div>
        </div>
      </div>
      <div class="macro-item">
        <div class="macro-icon">🍞</div>
        <div class="macro-info">
          <div class="macro-name">Carbs</div>
          <div class="macro-amount">${Math.round(nutrients.CHOCDF?.quantity || 0)}g</div>
        </div>
      </div>
      <div class="macro-item">
        <div class="macro-icon">🥑</div>
        <div class="macro-info">
          <div class="macro-name">Fat</div>
          <div class="macro-amount">${Math.round(nutrients.FAT?.quantity || 0)}g</div>
        </div>
      </div>
      <div class="macro-item">
        <div class="macro-icon">🌾</div>
        <div class="macro-info">
          <div class="macro-name">Fiber</div>
          <div class="macro-amount">${Math.round(nutrients.FIBTG?.quantity || 0)}g</div>
        </div>
      </div>
    </div>

    <div class="detailed-nutrition">
      <h4>Detailed Breakdown</h4>
      <div class="nutrition-grid">
        ${Object.entries(nutrients)
          .map(
            ([key, nutrient]) => `
          <div class="nutrition-detail">
            <span class="nutrient-name">${nutrient.label}</span>
            <span class="nutrient-value">${Math.round(nutrient.quantity)} ${nutrient.unit}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>

    ${
      data.dietLabels?.length
        ? `
      <div class="diet-labels">
        <h4>Diet Labels</h4>
        <div class="labels">
          ${data.dietLabels.map((label) => `<span class="diet-label">${label}</span>`).join("")}
        </div>
      </div>
    `
        : ""
    }

    ${
      data.healthLabels?.length
        ? `
      <div class="health-labels">
        <h4>Health Labels</h4>
        <div class="labels">
          ${data.healthLabels
            .slice(0, 6)
            .map((label) => `<span class="health-label">${label}</span>`)
            .join("")}
        </div>
      </div>
    `
        : ""
    }
  `

  resultsContainer.classList.remove("hidden")
}

function showLoading() {
  const loadingElement = document.getElementById("loading")
  const resultsContainer = document.getElementById("nutrition-results")

  if (loadingElement) loadingElement.classList.remove("hidden")
  if (resultsContainer) resultsContainer.classList.add("hidden")
}

function hideLoading() {
  const loadingElement = document.getElementById("loading")
  if (loadingElement) loadingElement.classList.add("hidden")
}

function showError(message) {
  const errorElement = document.getElementById("error-message")
  const resultsContainer = document.getElementById("nutrition-results")

  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.remove("hidden")
    setTimeout(() => errorElement.classList.add("hidden"), 5000)
  }

  if (resultsContainer) resultsContainer.classList.add("hidden")
}
