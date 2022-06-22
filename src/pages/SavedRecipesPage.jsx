import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SavedRecipeCard from '../components/SavedRecipeCard';
import { getDoneRecipes } from '../services/doneRecipes';
import { getFavoriteRecipes } from '../services/favoriteRecipes';
import '../styles/SavedRecipesPage.css';

const ROLE_SETTINGS = {
  done: {
    recipes: () => getDoneRecipes(),
  },
  favorite: {
    recipes: () => getFavoriteRecipes(),
  },
};

function SavedRecipesPage({ match: { url } }) {
  const role = url.split('/')[1].split('-')[0];
  const [filter, setFilter] = useState('all');
  const [savedRecipes, setSavedRecipes] = useState(ROLE_SETTINGS[role].recipes);

  useEffect(() => {
    setSavedRecipes(ROLE_SETTINGS[role].recipes()
      .filter(({ type }) => filter === 'all' || type === filter));
  }, [filter]);

  return (
    <>
      <Header page={ url.includes('done') ? '/doneRecipes' : '/favorite' } />
      <section className="filter-btn-container">
        {['all', 'food', 'drink'].map((filterBtn) => (
          <button
            key={ filterBtn }
            type="button"
            className={ `filter-btn ${filter === filterBtn ? ' active' : ''}` }
            data-testid={ `filter-by-${filterBtn}-btn` }
            onClick={ () => setFilter(filterBtn) }
          >
            {filterBtn[0].toUpperCase() + filterBtn.slice(1)}
          </button>
        ))}
      </section>
      <section className="done-recipes-cards-container">
        {savedRecipes.map((recipe, index) => (
          <SavedRecipeCard
            key={ `recipe-${index}` }
            role={ role }
            index={ index }
            recipe={ recipe }
            handleDelete={ setSavedRecipes }
          />
        ))}
      </section>
    </>
  );
}

SavedRecipesPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SavedRecipesPage;
