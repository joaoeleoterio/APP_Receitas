import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { getFavoriteRecipes, toggleFavoriteRecipe } from '../services/favoriteRecipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import TYPE_SETTINGS from '../services/roleSettings';

function FavoriteBtn({ testid, type, details, handleDelete }) {
  const currentId = details.id ? details.id : details[TYPE_SETTINGS[type].id];
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    setIsFavorite(getFavoriteRecipes()
      .some(({ id }) => id === currentId));
  }, [currentId]);

  return (
    <button
      type="button"
      className="btn-interact"
      onClick={ () => {
        toggleFavoriteRecipe(type, details);
        handleDelete(getFavoriteRecipes);
        setIsFavorite(!isFavorite);
      } }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        height="25px"
        alt="Favorite Button"
        data-testid={ testid }
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  testid: propTypes.string,
  type: propTypes.string.isRequired,
  details: propTypes.objectOf(propTypes.any).isRequired,
  handleDelete: propTypes.func,
};

FavoriteBtn.defaultProps = {
  testid: 'favorite-btn',
  handleDelete: () => {},
};

export default FavoriteBtn;
