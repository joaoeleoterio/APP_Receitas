import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import '../styles/ExplorePage.css';

function ExplorePage() {
  const history = useHistory();
  return (
    <>
      <Header page="/explore" />
      <div className="explore-buttons">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <MenuInferior />
    </>
  );
}

export default ExplorePage;
