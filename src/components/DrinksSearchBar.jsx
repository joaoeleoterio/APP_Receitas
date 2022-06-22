import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import searchOnAPI from '../services/searchOnAPI';

function DrinksSearchBar() {
  const { setRecipes, setAlert } = useContext(RecipesContext);
  const [inpSearch, setInpSearch] = useState('');
  const [searchType, setSearchType] = useState('');
  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        onChange={ ({ target }) => setInpSearch(target.value) }
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchBtn"
          value="ingredient"
          id="ingredient"
          onClick={ ({ target }) => setSearchType(target.value) }
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="searchBtn"
          value="name"
          id="name"
          onClick={ ({ target }) => setSearchType(target.value) }
        />
      </label>
      <label htmlFor="firstLetter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchBtn"
          value="firstLetter"
          id="firstLetter"
          onClick={ ({ target }) => setSearchType(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ async () => {
          let url = '';
          switch (searchType) {
          case 'ingredient':
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inpSearch}`;
            break;
          case 'name':
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inpSearch}`;
            break;
          default:
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inpSearch}`;
          }
          if (searchType === 'firstLetter' && inpSearch.length > 1) {
            return global.alert('Your search must have only 1 (one) character');
          }
          const result = await searchOnAPI(url);
          setRecipes(result.drinks);
          setAlert(true);
        } }
      >
        Search
      </button>
    </div>
  );
}

export default DrinksSearchBar;
