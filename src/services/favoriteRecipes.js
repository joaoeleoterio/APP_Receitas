import TYPE_SETTINGS from './roleSettings';

export const getFavoriteRecipes = () => (localStorage.favoriteRecipes
  ? JSON.parse(localStorage.favoriteRecipes) : []);

export function toggleFavoriteRecipe(type, recipe) {
  const favorites = getFavoriteRecipes();
  const currentId = recipe.id ? recipe.id : recipe[TYPE_SETTINGS[type].id];

  if (favorites.some(({ id }) => id === currentId)) {
    localStorage.favoriteRecipes = JSON.stringify([
      ...favorites.filter(({ id }) => id !== currentId),
    ]);
  } else {
    const recipeMapped = {
      id: recipe[TYPE_SETTINGS[type].id],
      type: type.slice(0, type.length - 1),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: type === 'foods' ? '' : recipe.strAlcoholic,
      name: recipe[TYPE_SETTINGS[type].name],
      image: recipe[TYPE_SETTINGS[type].thumb],
      // doneDate: new Date().toLocaleDateString(),
      // tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };

    localStorage.favoriteRecipes = JSON.stringify([
      ...favorites,
      recipeMapped,
    ]);
  }
}
