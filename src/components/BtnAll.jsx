import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function BtnAll({ type, setValueBtn, valueBtn }) {
  const { setRecipes, setAlert } = useContext(RecipesContext);

  return (
    <button
      type="button"
      style={ {
        backgroundColor: !valueBtn ? 'var(--btn-background)' : 'transparent',
      } }
      data-testid="All-category-filter"
      key="btnAll"
      value="btnAll"
      onClick={ async () => {
        setAlert(false);
        setRecipes([]);
        setValueBtn('');
        const endpoint = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
        const res = await fetch(endpoint);
        const data = await res.json();
        if (type === 'meal') return setRecipes(data.meals);
        return setRecipes(data.drinks);
      } }
    >
      All
    </button>
  );
}

BtnAll.propTypes = {
  setValueBtn: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  valueBtn: PropTypes.string.isRequired,
};

export default BtnAll;
