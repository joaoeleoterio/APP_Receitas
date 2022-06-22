import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import searchOnAPI from '../services/searchOnAPI';
import RecipesContext from '../context/RecipesContext';
import FilterButtons from './FilterButtons';
import '../styles/Categories.css';

const MAX_BTNS = 5;
function Categories({ page }) {
  const [isLoading, setIsLoading] = useState(true);
  const [btns, setBtns] = useState([]);
  const [activeBtn, setActiveBtn] = useState(false);
  const { recipes } = useContext(RecipesContext);

  useEffect(() => {
    setIsLoading(true);
    const reqAPI = async () => {
      let response = '';
      const foodURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      if (page.includes('foods')) {
        const data = await searchOnAPI(foodURL);
        response = await data.meals;
      }
      if (page.includes('drinks')) {
        const data = await searchOnAPI(drinkURL);
        response = await data.drinks;
      }
      setIsLoading(false);
      setBtns(response);
    };
    reqAPI();
  }, []);

  if (btns.length > MAX_BTNS) {
    const newBtnList = btns.filter((value, index) => index < MAX_BTNS);
    setBtns(newBtnList);
  }

  if (recipes.length === 1 && activeBtn === false) {
    if (page.includes('foods')) {
      return <Redirect to={ `/foods/${recipes[0].idMeal}` } />;
    }
    return <Redirect to={ `/drinks/${recipes[0].idDrink}` } />;
  }

  return (
    <section className="categories-container">
      {!isLoading && (
        <FilterButtons
          buttonsFunc={ (active) => setActiveBtn(active) }
          page={ page }
          btns={ btns }
        />
      )}
    </section>
  );
}

Categories.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Categories;
