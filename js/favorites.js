import { getFavorites, clearFavorites, getShoppingList, clearShoppingList } from "./modules/favorites.js"

document.addEventListener("DOMContentLoaded", () => {
  initializePage()
})

function initializePage() {
  initMobileMenu()
  loadFavorites()
  loadShoppingList()
  setupClearButtons()
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

function loadFavorites() {
  const favoritesGrid = document.getElementById("favorites-grid")
  const favorites = getFavorites()

  if (!favoritesGrid) return

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = `
      <div class="no-favorites">
        <h3>No favorite recipes yet</h3>
        <p>Start exploring recipes and add your favorites!</p>
        <a href="/" class="btn-primary">Find Recipes</a>
      </div>
    `
    return
  }

  favoritesGrid.innerHTML = favorites
    .map(
      (recipe) => `
    <article class="recipe-card" onclick="window.location.href='/recipe.html?id=${recipe.id}'">
      <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
      <div class="recipe-card-content">
        <h3>${recipe.title}</h3>
        <p class="added-date">Added: ${new Date(recipe.addedAt).toLocaleDateString()}</p>
        <button class="view-recipe-btn" onclick="event.stopPropagation(); window.location.href='/recipe.html?id=${recipe.id}'">
          View Recipe
        </button>
      </div>
    </article>
  `,
    )
    .join("")
}

function loadShoppingList() {
  const shoppingListContainer = document.getElementById("shopping-list")
  const shoppingList = getShoppingList()

  if (!shoppingListContainer) return

  if (shoppingList.length === 0) {
    shoppingListContainer.innerHTML = `
      <div class="empty-shopping-list">
        <p>Your shopping list is empty</p>
        <p>Add ingredients from recipe pages to build your list!</p>
      </div>
    `
    return
  }

  shoppingListContainer.innerHTML = `
    <ul class="shopping-list-items">
      ${shoppingList.map((item) => `<li class="shopping-item">${item}</li>`).join("")}
    </ul>
  `
}

function setupClearButtons() {
  const clearFavoritesBtn = document.getElementById("clear-favorites")
  const clearShoppingListBtn = document.getElementById("clear-shopping-list")

  if (clearFavoritesBtn) {
    clearFavoritesBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all favorites?")) {
        clearFavorites()
        loadFavorites()
      }
    })
  }

  if (clearShoppingListBtn) {
    clearShoppingListBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your shopping list?")) {
        clearShoppingList()
        loadShoppingList()
      }
    })
  }
}
