import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import '../styles/ProfilePage.css';

function ProfilePage() {
  // const email = localStorage.getItem('user');
  // const emailLimpo = JSON.parse(email);
  const history = useHistory();

  const handleEmail = () => {
    if (localStorage.getItem('user')) {
      const email = localStorage.getItem('user');
      const emailLimpo = JSON.parse(email);
      return emailLimpo.email;
    }
    return '';
  };

  const handleLogOut = () => {
    localStorage.clear();
    history.push('/');
  };
  const toDoneRecipes = () => {
    history.push('/done-recipes');
  };
  const toFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  return (
    <>
      <Header page="/profile" />
      <h2
        data-testid="profile-email"
        className="profile-email"
      >
        { handleEmail() }
      </h2>
      <div className="profile-buttons">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ toDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ toFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogOut }
        >
          Logout
        </button>
      </div>
      <MenuInferior />
    </>
  );
}

export default ProfilePage;
