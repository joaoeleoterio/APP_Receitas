/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import searchOnAPI from '../services/searchOnAPI';
import TYPE_SETTINGS from '../services/roleSettings';
import { setDoneRecipe } from '../services/doneRecipes';
import { getProgressRecipes,
  addProgressRecipe, removeProgressRecipe } from '../services/progressRecipes';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import Loading from '../components/Loading';

const LAST_CHAR = -1;

const DONE_CLASSNAME = {
  false: '',
  true: 'done',
};

function GeneralProgressPage({ history, match: { url, params: { id } } }) {
  const role = url.split('/')[1];
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [donedSteps, setDonedSteps] = useState(getProgressRecipes()[TYPE_SETTINGS[role]
    .type][id] || []);

  useEffect(() => {
    searchOnAPI(TYPE_SETTINGS[role].api(id))
      .then((data) => {
        const info = data[TYPE_SETTINGS[role].result][0];
        setDetails(info);
        setIngredients(Object.entries(info).reduce((acc, [key, value]) => {
          if (key.includes('strIngredient') && value !== '' && value !== null) {
            acc.push(value);
          } else if (key.includes('strMeasure')
            && !['', ' '].includes(value) && value !== null) {
            acc[key.slice(LAST_CHAR) - 1] += ` - ${value}`;
          }
          return acc;
        }, []));
      }).catch(() => {
        global
          .alert(`A ${TYPE_SETTINGS[role].translate} com id ${id} não foi encontrada.`);
        history.push(`/${role}`);
      });
  }, []);

  function onInputChange(checked, index) {
    const callback = checked ? addProgressRecipe : removeProgressRecipe;
    callback(TYPE_SETTINGS[role].type, id, index);
    setDonedSteps((prevSteps) => (checked
      ? [...prevSteps, index] : prevSteps.filter((step) => step !== index)));
  }

  function handleDoneRecipe() {
    setDoneRecipe(role, details);
    history.push('/done-recipes');
  }

  return (
    <section className="details-page">
      {JSON.stringify(details) === '{}' ? <Loading /> : (
        <>
          <img
            className="recipe-photo"
            data-testid="recipe-photo"
            src={ details[TYPE_SETTINGS[role].thumb] }
            alt={ details[TYPE_SETTINGS[role].name] }
          />
          <section className="recipe-header">
            <div>
              <ShareBtn
                link={ window.location.href.split('/in-progress')[0] }
              />
              <FavoriteBtn type={ role } details={ details } />
            </div>
            <h2 data-testid="recipe-title">{ details[TYPE_SETTINGS[role].name] }</h2>
            <h4 data-testid="recipe-category">{ details.strCategory }</h4>
          </section>
          <section className="recipe-ingredients-container">
            <h3>Ingredients</h3>
            <ul
              style={ {
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                listStyle: 'none',
              } }
            >
              {ingredients.map((ingredient, index) => (
                <li
                  className={ DONE_CLASSNAME[donedSteps.includes(index)] }
                  key={ ingredient }
                >
                  <label
                    style={ { display: 'flex', gap: '2px' } }
                    htmlFor={ `step-${index}` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      id={ `step-${index}` }
                      type="checkbox"
                      checked={ donedSteps.includes(index) }
                      onChange={ ({ target }) => onInputChange(target.checked, index) }
                    />
                    {ingredient}
                  </label>
                </li>
              ))}
            </ul>
          </section>
          <section className="recipe-instructions-container">
            <h3>Instructions</h3>
            <p data-testid="instructions">{details.strInstructions}</p>
          </section>
          <button
            type="button"
            disabled={ donedSteps.length !== ingredients.length }
            onClick={ handleDoneRecipe }
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </>
      )}
    </section>
  );
}

GeneralProgressPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GeneralProgressPage;
