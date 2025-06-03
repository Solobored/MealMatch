export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]")
  } catch (error) {
    console.error("Error getting favorites:", error)
    return []
  }
}

export function addToFavorites(recipe) {
  try {
    const favorites = getFavorites()
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      favorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        addedAt: new Date().toISOString(),
      })
      localStorage.setItem("favorites", JSON.stringify(favorites))
      return true
    }
    return false
  } catch (error) {
    console.error("Error adding to favorites:", error)
    return false
  }
}

export function removeFromFavorites(recipeId) {
  try {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter((recipe) => recipe.id != recipeId)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    return true
  } catch (error) {
    console.error("Error removing from favorites:", error)
    return false
  }
}

export function clearFavorites() {
  try {
    localStorage.removeItem("favorites")
    return true
  } catch (error) {
    console.error("Error clearing favorites:", error)
    return false
  }
}

export function getShoppingList() {
  try {
    return JSON.parse(localStorage.getItem("shoppingList") || "[]")
  } catch (error) {
    console.error("Error getting shopping list:", error)
    return []
  }
}

export function addToShoppingList(ingredients) {
  try {
    const currentList = getShoppingList()
    const updatedList = [...new Set([...currentList, ...ingredients])]
    localStorage.setItem("shoppingList", JSON.stringify(updatedList))
    return true
  } catch (error) {
    console.error("Error adding to shopping list:", error)
    return false
  }
}

export function clearShoppingList() {
  try {
    localStorage.removeItem("shoppingList")
    return true
  } catch (error) {
    console.error("Error clearing shopping list:", error)
    return false
  }
}
