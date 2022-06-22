import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import Loading from '../components/Loading';
import reqAPI from '../services/reqAPI';
import Categories from '../components/Categories';
import TYPE_SETTINGS from '../services/roleSettings';
import searchOnAPI from '../services/searchOnAPI';
import '../styles/GeneralRecipes.css';

function GeneralPage({ match: { path } }) {
  const role = path.split('/')[1];
  const [isLoading, setIsLoading] = useState(true);
  const { recipes, setRecipes, alert, setAlert, ingredientFilter,
    setIngredientFilter } = useContext(RecipesContext);

  useEffect(() => {
    async function getRecipes() {
      const url = TYPE_SETTINGS[role].searchIngredient(ingredientFilter);
      const result = await searchOnAPI(url);
      setRecipes(result[TYPE_SETTINGS[role].result]);
      setIsLoading(false);
    }
    const loadingFoods = async () => {
      const data = await reqAPI(TYPE_SETTINGS[role].type);
      const response = await data[TYPE_SETTINGS[role].result];
      setRecipes(response);
      setAlert(false);
      setIsLoading(false);
      return response;
    };
    if (ingredientFilter) {
      getRecipes();
    } else {
      loadingFoods();
    }

    return () => {
      setIngredientFilter('');
    };
  }, []);

  return (
    <>
      <Header page={ path } />
      <Categories
        page={ path }
      />
      <section className="recipes-cards-container">
        { isLoading || (recipes.length === 0 && !alert) ? (
          <Loading />
        ) : recipes.map((value, index) => (
          <Link
            key={ value[TYPE_SETTINGS[role].name] }
            to={ `/${role}/${value[TYPE_SETTINGS[role].id]}` }
            className="recipe-card-link"
          >
            <RecipeCard
              index={ index }
              name={ value[TYPE_SETTINGS[role].name] }
              category={ value.strCategory || '' }
              thumb={ value[TYPE_SETTINGS[role].thumb] }
            />
          </Link>
        )) }
      </section>
      { recipes.length === 0 && alert
      && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
      <MenuInferior />
    </>
  );
}

GeneralPage.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};

export default GeneralPage;
