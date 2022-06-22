export const getProgressRecipes = () => (localStorage.inProgressRecipes
  ? JSON.parse(localStorage.inProgressRecipes) : { cocktails: {}, meals: {} });

export function addProgressRecipe(type, recipeId, ingredientId) {
  const progress = getProgressRecipes();
  const recipe = progress[type][recipeId] || [];
  recipe.push(ingredientId);
  localStorage.inProgressRecipes = JSON.stringify({
    ...progress,
    [type]: {
      ...progress[type],
      [recipeId]: recipe.sort(),
    },
  });
}

export function removeProgressRecipe(type, recipeId, ingredientId) {
  const progress = getProgressRecipes();
  const recipe = progress[type][recipeId].filter((id) => id !== ingredientId);
  localStorage.inProgressRecipes = JSON.stringify({
    ...progress,
    [type]: {
      ...progress[type],
      [recipeId]: recipe.length > 0 ? recipe : undefined,
    },
  });
}
