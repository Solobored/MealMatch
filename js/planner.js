import { generateMealPlan, getMealPlan } from "./modules/planner.js"
import { renderMealPlan, showLoading, showError, hideLoading } from "./modules/ui.js"

document.addEventListener("DOMContentLoaded", () => {
  initializePage()
})

function initializePage() {
  initMobileMenu()
  setupPlannerForm()
  loadExistingPlan()
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

function setupPlannerForm() {
  const plannerForm = document.getElementById("planner-form")

  if (!plannerForm) return

  plannerForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitButton = plannerForm.querySelector('button[type="submit"]')
    const daysSelect = document.getElementById("plan-days")
    const days = Number.parseInt(daysSelect.value, 10)

    try {
      submitButton.disabled = true
      submitButton.textContent = "Generating Plan..."
      showLoading("meal-plan")

      const mealPlan = await generateMealPlan(days)
      hideLoading("meal-plan")
      renderMealPlan(mealPlan)
    } catch (error) {
      hideLoading("meal-plan")
      showError("meal-plan", "Failed to generate meal plan. Please try again.")
      console.error("Error generating meal plan:", error)
    } finally {
      submitButton.disabled = false
      submitButton.textContent = "Generate Meal Plan"
    }
  })
}

function loadExistingPlan() {
  const existingPlan = getMealPlan()
  if (existingPlan) {
    renderMealPlan(existingPlan)
  }
}
