import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import searchOnAPI from '../services/searchOnAPI';
import ROLE_SETTINGS from '../services/roleSettings';
import '../styles/ExploreFiltersPage.css';

function ExploreFiltersPage({ match }) {
  const [surpriseId, setSurpriseId] = useState('');
  const role = match.url.split('/')[2];

  useEffect(() => {
    searchOnAPI(ROLE_SETTINGS[role].apiRandom).then((result) => {
      setSurpriseId(result[ROLE_SETTINGS[role].result][0][ROLE_SETTINGS[role].id]);
    });
  }, []);

  return (
    <>
      <Header page={ `/explore-${role}` } />
      <section className="explore-filters-container">
        <Link
          to={ `/explore/${role}/ingredients` }
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Link>
        {role === 'foods' && (
          <Link
            to={ `/explore/${role}/nationalities` }
            data-testid="explore-by-nationality"
          >
            By Nationality
          </Link>
        )}
        <Link
          to={ `/${role}/${surpriseId}` }
          data-testid="explore-surprise"
        >
          Surprise me!
        </Link>
      </section>
      <MenuInferior />
    </>
  );
}

ExploreFiltersPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreFiltersPage;
