import React from 'react';
import propTypes from 'prop-types';
import '../styles/RecipeCard.css';

function RecipeCard({
  index, name, category, thumb,
}) {
  return (
    <div
      className={ `recipe-card${!category ? ' without-category' : ''}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        className="recipe-card-img"
        src={ thumb }
        alt={ `${name}` }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
      <h4>{ category }</h4>
    </div>
  );
}

RecipeCard.propTypes = {
  index: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  thumb: propTypes.string.isRequired,
};

export default RecipeCard;
