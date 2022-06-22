import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import TYPE_SETTINGS from '../services/roleSettings';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import StartRecipeBtn from '../components/StartRecipeBtn';
import Loading from '../components/Loading';
import '../styles/components.css';
import '../styles/GeneralDetailsPage.css';

const LAST_CHAR = -1;
const MAX_RECOMENDATION = 6;

function GeneralDetailsPage({ match: { url, params: { id } } }) {
  const role = url.split('/')[1];
  const reverseRole = TYPE_SETTINGS[role].recomendation;
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    async function getWithId() {
      const endpoint = TYPE_SETTINGS[role].api(id);
      const type = TYPE_SETTINGS[role].result;
      const response = await fetch(endpoint);
      const data = await response.json();
      setDetails(data[type][0]);
      setIngredients(Object.entries(data[type][0]).reduce((acc, [key, value]) => {
        if (key.includes('strIngredient') && value !== '' && value !== null) {
          acc.push(value);
        } else if (key.includes('strMeasure')
          && !['', ' '].includes(value) && value !== null) {
          acc[key.slice(LAST_CHAR) - 1] += ` - ${value}`;
        }
        return acc;
      }, []));
    }

    async function getRecomendation() {
      const endpoint = TYPE_SETTINGS[reverseRole].apiRecomendation;
      const type = TYPE_SETTINGS[reverseRole].result;
      const response = await fetch(endpoint);
      const data = await response.json();
      setRecomendation(data[type].filter((_, index) => index < MAX_RECOMENDATION));
    }

    getWithId();
    getRecomendation();
  }, []);

  const ingredientsRender = (
    <ul>
      { ingredients.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ `${index}-ingredient-name-and-measure` }
        >
          { ingredient }
        </li>
      ))}
    </ul>
  );

  return (
    <section className="details-page">
      {JSON.stringify(details) === '{}' ? <Loading /> : (
        <>
          <img
            data-testid="recipe-photo"
            src={ details[TYPE_SETTINGS[role].thumb] }
            alt={ details[TYPE_SETTINGS[role].name] }
            className="recipe-photo"
          />
          <section className="recipe-header">
            <div>
              <ShareBtn />
              <FavoriteBtn type={ role } details={ details } />
            </div>
            <h2 data-testid="recipe-title">{ details[TYPE_SETTINGS[role].name] }</h2>
            <h4 data-testid="recipe-category">
              { role === 'drinks' ? details.strAlcoholic : details.strCategory }
            </h4>
          </section>
          <section className="recipe-ingredients-container">
            <h3>Ingredients</h3>
            { ingredientsRender }
          </section>
          <section className="recipe-instructions-container">
            <h3>Instructions</h3>
            <p data-testid="instructions">{ details.strInstructions }</p>
            {role === 'foods' && (
              <iframe
                data-testid="video"
                src={ details.strYoutube }
                title="YouTube video player"
                frameBorder="0"
                allow={ 'accelerometer; autoplay; clipboard-write; encrypted-media;'
                  + 'gyroscope; picture-in-picture' }
                allowFullScreen
              />
            )}
          </section>
          <section className="recipe-recomendation-container">
            { recomendation.length > 0
              ? recomendation.map((value, index) => (
                <Link
                  key={ `${index}-recomendation-card` }
                  data-testid={ `${index}-recomendation-card` }
                  to={ `/${reverseRole}/${value[TYPE_SETTINGS[reverseRole].id]}` }
                >
                  <img
                    src={ value[TYPE_SETTINGS[reverseRole].thumb] }
                    alt={ value[TYPE_SETTINGS[reverseRole].name] }
                  />
                  <h3
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { value[TYPE_SETTINGS[reverseRole].name] }
                  </h3>
                </Link>
              )) : '' }
          </section>
          <section>
            <StartRecipeBtn itemId={ id } role={ role } />
          </section>
        </>
      )}
    </section>
  );
}

GeneralDetailsPage.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};

export default GeneralDetailsPage;
