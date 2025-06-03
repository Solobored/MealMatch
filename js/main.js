import { setupSearch } from "./modules/search.js"
import { setupUI } from "./modules/ui.js"

document.addEventListener("DOMContentLoaded", () => {
  setupSearch()
  setupUI()

  // Initialize mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
    })
  }
})
