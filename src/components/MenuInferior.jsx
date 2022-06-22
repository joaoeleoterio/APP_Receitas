import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/components.css';
import '../styles/MenuInferior.css';

function MenuInferior() {
  const { location: { pathname } } = useHistory();

  return (
    <section>
      <footer data-testid="footer">
        <Link
          className={ pathname === '/drinks' ? 'active' : '' }
          to="/drinks"
        >
          <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
        </Link>
        <Link
          className={ pathname === '/explore' ? 'active' : '' }
          to="/explore"
        >
          <img
            src={ exploreIcon }
            alt="Explore Icon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link
          className={ pathname === '/foods' ? 'active' : '' }
          to="/foods"
        >
          <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
        </Link>
      </footer>
    </section>
  );
}

export default MenuInferior;
