import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import RecipesContext from '../context/RecipesContext';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ page }) {
  const [showInputSearch, setShowInputSearch] = useState(false);
  const { handleTitlePage } = useContext(RecipesContext);
  const history = useHistory();

  const toProfile = () => {
    history.push('/profile');
  };

  const showInput = () => {
    setShowInputSearch(!showInputSearch);
  };

  const searchBtn = (
    <button className="header-btn" type="button" onClick={ showInput }>
      <img src={ searchIcon } alt="Imagem de Lupa" data-testid="search-top-btn" />
    </button>
  );

  const pagesNonSearch = [
    '/explore', '/explore-foods', '/explore-drinks',
    '/exploreDrinksIng', '/exploreFoodsIng', '/favorite',
    '/profile', '/doneRecipes',
  ];

  const divVazia = (
    <div className="div-vazia" />
  );

  const showSearchBtn = pagesNonSearch.includes(page) ? divVazia : searchBtn;

  return (
    <section
      className={ `header-container${showInputSearch ? ' opened' : ''}` }
    >
      <header>
        <button
          className="header-btn"
          type="button"
          onClick={ toProfile }
        >
          <img
            src={ profileIcon }
            alt="Imagem de Perfil"
            data-testid="profile-top-btn"
          />
        </button>
        <h1 data-testid="page-title">
          {handleTitlePage(page)}
        </h1>
        {showSearchBtn}
      </header>
      {showInputSearch ? <SearchBar page={ page } /> : null}
    </section>
  );
}

Header.propTypes = {
  page: propTypes.string.isRequired,
};

export default Header;
