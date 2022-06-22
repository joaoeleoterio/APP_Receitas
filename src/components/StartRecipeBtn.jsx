import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getDoneRecipes } from '../services/doneRecipes';
import { getProgressRecipes } from '../services/progressRecipes';

const TYPE = {
  foods: 'meals',
  drinks: 'cocktails',
};

function StartRecipeBtn({ itemId, role }) {
  const history = useHistory();
  const done = getDoneRecipes().some(({ id }) => id === itemId);
  const progress = getProgressRecipes()[TYPE[role]][itemId];

  if (done) return '';

  return (
    <button
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      type="button"
      onClick={ () => history.push(`/${role}/${itemId}/in-progress`) }
    >
      {progress ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

StartRecipeBtn.propTypes = {
  itemId: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default StartRecipeBtn;
