import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import '../styles/SavedRecipeCard.css';

function SavedRecipeCard({ role, recipe, index, handleDelete }) {
  const history = useHistory();

  function handleChangeRoute() {
    history.push(`/${recipe.type}s/${recipe.id}`);
  }

  return (
    <section className="done-recipe-container">
      <button
        type="button"
        className="image-btn-container filter-btn"
        onClick={ handleChangeRoute }
      >
        <img
          height="100%"
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      <div className="done-recipe-subcontainer">
        <div>
          <div>
            <span
              className="done-recipe-category"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </span>
            <button
              type="button"
              className="done-recipe-name filter-btn"
              onClick={ handleChangeRoute }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </button>
          </div>
          <div>
            {role === 'favorite' && (
              <FavoriteBtn
                testid={ `${index}-horizontal-favorite-btn` }
                type={ role }
                details={ recipe }
                handleDelete={ handleDelete }
              />
            )}
            <ShareBtn
              testid={ `${index}-horizontal-share-btn` }
              link={ `${window.location.href
                .split(`/${role}-recipes`)[0]}/${recipe.type}s/${recipe.id}` }
              notificationPosition="absolute"
            />
          </div>
        </div>
        {recipe.doneDate && (
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            Done in:
            {' '}
            {recipe.doneDate}
          </span>
        )}
        <div className="recipe-tag-container">
          {recipe.tags && recipe.tags.map((tag) => (
            <span
              key={ `${tag}-${index}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

SavedRecipeCard.propTypes = {
  role: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default SavedRecipeCard;
