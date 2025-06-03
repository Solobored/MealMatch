import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
        recipe: "./recipe.html",
        favorites: "./favorites.html",
        planner: "./planner.html",
        nutrition: "./nutrition.html",
        surprise: "./surprise.html",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
