import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TYPE_SETTINGS from '../services/roleSettings';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import reqAPI from '../services/reqAPI';
import MenuInferior from '../components/MenuInferior';

function ExploreNatPage({ match: { url } }) {
  const role = url.split('/')[2];
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [nationalities, setNationalities] = useState([]);
  const [currentNationality, setCurrentNationality] = useState('All');
  useEffect(() => {
    async function getNationalities() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setNationalities(data.meals);
    }
    getNationalities();
  }, []);
  useEffect(() => {
    const loadingFoods = async () => {
      // const nacionalidade = currentNationality === 'All' ? '' : currentNationality;
      // const data = await reqAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nacionalidade}`);
      // const response = await data[TYPE_SETTINGS[role].result];
      // setRecipes(response.filter((value) => value.strArea.includes(nacionalidade)));
      const nacionalidade = currentNationality === 'All'
        ? await reqAPI(TYPE_SETTINGS[role].type)
        : await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentNationality}`);
      const response = currentNationality === 'All'
        ? nacionalidade : await nacionalidade.json();
      console.log(response.meals);
      setRecipes(response.meals);
    };
    loadingFoods();
  }, [nationalities, currentNationality]);
  return (
    <div className="explore-nationalities-page">
      <Header page="/ExploreFoodsNat" />
      <select
        data-testid="explore-by-nationality-dropdown"
        value={ currentNationality }
        onChange={ ({ target }) => setCurrentNationality(target.value) }
      >
        <option
          data-testid="All-option"
        >
          All
        </option>
        { nationalities.map((value) => (
          <option
            key={ value.strArea }
            data-testid={ `${value.strArea}-option` }
          >
            { value.strArea }
          </option>
        )) }
      </select>
      <div className="recipes-cards-container">
        { recipes.map((value, index) => (
          <Link
            key={ value[TYPE_SETTINGS[role].name] }
            to={ `/${role}/${value[TYPE_SETTINGS[role].id]}` }
          >
            <RecipeCard
              index={ index }
              name={ value[TYPE_SETTINGS[role].name] }
              category={ value.strCategory }
              thumb={ value[TYPE_SETTINGS[role].thumb] }
            />
          </Link>
        )) }
      </div>
      <MenuInferior />
    </div>
  );
}

ExploreNatPage.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};

export default ExploreNatPage;
