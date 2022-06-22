import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TYPE_SETTINGS from '../services/roleSettings';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import '../styles/ExploreIngredientsPage.css';

const MAX_INDEX = 12;

function ExploreIngredientsPage({ match: { url } }) {
  const role = url.split('/')[2];
  const { setIngredientFilter } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    async function getIngredients() {
      const endpoint = TYPE_SETTINGS[role].apiIngredient;
      const response = await fetch(endpoint);
      const data = await response.json();
      const ingredientList = data[TYPE_SETTINGS[role].result]
        .filter((_, index) => index < MAX_INDEX);
      setIngredients(ingredientList);
    }
    getIngredients();
  }, []);
  useEffect(() => {
    async function getPhotos(ingredientList) {
      const photosList = [];
      ingredientList.forEach(async (value) => {
        const response = TYPE_SETTINGS[role]
          .apiIngredientPhoto(value[TYPE_SETTINGS[role].ingredientReturn]);
        photosList.push(response);
      });
      setPhotos(photosList);
    }
    getPhotos(ingredients);
  }, [ingredients]);
  return (
    <>
      <Header page={ role === 'foods' ? '/exploreFoodsIng' : '/exploreDrinksIng' } />
      <section className="ingredients-container">
        { ingredients.map((value, index) => (
          <Link
            key={ index }
            className="ingredient-card"
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => (
              setIngredientFilter(value[TYPE_SETTINGS[role].ingredientReturn])
            ) }
            to={ `/${role}` }
          >
            <section>
              <img
                src={ photos[index] }
                alt={ value[TYPE_SETTINGS[role].ingredientReturn] }
                data-testid={ `${index}-card-img` }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                { value[TYPE_SETTINGS[role].ingredientReturn] }
              </h3>
            </section>
          </Link>
        )) }
      </section>
      <MenuInferior />
    </>
  );
}

ExploreIngredientsPage.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};

export default ExploreIngredientsPage;
