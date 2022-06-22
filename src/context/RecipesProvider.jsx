import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const MAX_RECIPES = 12;

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState(false);
  const [ingredientFilter, setIngredientFilter] = useState('');
  useEffect(() => {
    if (recipes === null) setRecipes([]);
    if (recipes !== null && recipes.length > MAX_RECIPES) {
      const newRecipes = recipes.filter((_, index) => index < MAX_RECIPES);
      setRecipes(newRecipes);
    }
  }, [recipes]);

  const handleTitlePage = (page) => {
    if (page === '/foods') return 'Foods';
    if (page === '/detailFoods') return 'Foods';
    if (page === '/drinks') return 'Drinks';
    if (page === '/doneRecipes') return 'Done Recipes';
    if (page === '/profile') return 'Profile';
    if (page === '/explore') return 'Explore';
    if (page === '/explore-foods') return 'Explore Foods';
    if (page === '/explore-drinks') return 'Explore Drinks';
    if (page === '/exploreDrinksIng') return 'Explore Ingredients';
    if (page === '/exploreFoodsIng') return 'Explore Ingredients';
    if (page === '/favorite') return 'Favorite Recipes';
    if (page === '/ExploreFoodsNat') return 'Explore Nationalities';
    return 'Receitas';
  };

  const contextValue = {
    recipes,
    setRecipes,
    handleTitlePage,
    alert,
    setAlert,
    ingredientFilter,
    setIngredientFilter,
  };
  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
