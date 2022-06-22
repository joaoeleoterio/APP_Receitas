import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import searchOnAPI from '../services/searchOnAPI';
import TYPE_SETTINGS from '../services/roleSettings';

function SearchBar({ page }) {
  const role = page.split('/')[1];
  const { setRecipes, setAlert } = useContext(RecipesContext);
  const [inpSearch, setInpSearch] = useState('');
  const [searchType, setSearchType] = useState('');

  async function onSubmitSearch(event) {
    event.preventDefault();
    let url = '';
    switch (searchType) {
    case 'ingredient':
      url = TYPE_SETTINGS[role].searchIngredient(inpSearch);
      break;
    case 'name':
      url = TYPE_SETTINGS[role].searchName(inpSearch);
      break;
    default:
      url = TYPE_SETTINGS[role].searchFirstLetter(inpSearch);
    }
    if (searchType === 'firstLetter' && inpSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const result = await searchOnAPI(url);
    setAlert(true);
    setRecipes(result[TYPE_SETTINGS[role].result] || []);
  }

  return (
    <section className="search-bar">
      <form onSubmit={ onSubmitSearch } className="search-bar-form">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search"
          onChange={ ({ target }) => setInpSearch(target.value) }
        />
        <div>
          <label htmlFor="ingredient">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="searchBtn"
              value="ingredient"
              id="ingredient"
              onClick={ ({ target }) => setSearchType(target.value) }
            />
            Ingredient
          </label>
          <label htmlFor="Name">
            <input
              data-testid="name-search-radio"
              type="radio"
              name="searchBtn"
              value="name"
              id="name"
              onClick={ ({ target }) => setSearchType(target.value) }
            />
            Name
          </label>
          <label htmlFor="firstLetter">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="searchBtn"
              value="firstLetter"
              id="firstLetter"
              onClick={ ({ target }) => setSearchType(target.value) }
            />
            First Letter
          </label>
        </div>
        <button
          type="submit"
          disabled={ !inpSearch }
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </form>
    </section>
  );
}

SearchBar.propTypes = {
  page: propTypes.string.isRequired,
};

export default SearchBar;
