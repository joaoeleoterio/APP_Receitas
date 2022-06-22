import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import searchOnAPI from '../services/searchOnAPI';

function BtnFilter({ btns, buttonsFunc, valueBtn, setValueBtn, type }) {
  const { setRecipes, setAlert } = useContext(RecipesContext);

  return (
    btns.map(
      (category) => (
        <button
          type="button"
          style={ {
            backgroundColor: category.strCategory === valueBtn
              ? 'var(--btn-background)' : 'transparent',
          } }
          data-testid={ `${category.strCategory}-category-filter` }
          key={ category.strCategory }
          value={ category.strCategory }
          onClick={ async ({ target }) => {
            setAlert(false);
            setRecipes([]);
            buttonsFunc(true);
            if (valueBtn === target.value) {
              setValueBtn('');
              const endpoint = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
              const res = await fetch(endpoint);
              const data = await res.json();
              if (type === 'meal') return setRecipes(data.meals);
              return setRecipes(data.drinks);
            }
            if (valueBtn !== target.value || valueBtn === '') {
              setValueBtn(target.value);
              let url = '';
              url = `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${target.value}`;
              const result = await searchOnAPI(url);
              if (type === 'meal') return setRecipes(result.meals);
              return setRecipes(result.drinks);
            }
          } }
        >
          {category.strCategory}
        </button>),
    )
  );
}

BtnFilter.propTypes = {
  btns: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonsFunc: PropTypes.func.isRequired,
  valueBtn: PropTypes.string.isRequired,
  setValueBtn: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default BtnFilter;
