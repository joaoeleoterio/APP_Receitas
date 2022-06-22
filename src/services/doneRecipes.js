import TYPE_SETTINGS from './roleSettings';

export const getDoneRecipes = () => (localStorage.doneRecipes
  ? JSON.parse(localStorage.doneRecipes) : []);

export function setDoneRecipe(type, recipe) {
  const dones = getDoneRecipes();
  const recipeMapped = {
    id: recipe[TYPE_SETTINGS[type].id],
    type: type.slice(0, type.length - 1),
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: type === 'foods' ? '' : recipe.strAlcoholic,
    name: recipe[TYPE_SETTINGS[type].name],
    image: recipe[TYPE_SETTINGS[type].thumb],
    doneDate: new Date().toLocaleDateString(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };

  localStorage.doneRecipes = JSON.stringify([
    ...dones,
    recipeMapped,
  ]);
}
