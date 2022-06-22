import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import LoginPage from './pages/LoginPage';
import GeneralProgressPage from './pages/GeneralProgressPage';
import ExplorePage from './pages/ExplorePage';
import ExploreIngredientsPage from './pages/ExploreIngredientsPage';
import ExploreNatPage from './pages/ExploreNatPage';
import NotFoundPage from './pages/NotFoundPage';
import ExploreFiltersPage from './pages/ExploreFiltersPage';
import ProfilePage from './pages/ProfilePage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import GeneralPage from './pages/GeneralPage';
import GeneralDetailsPage from './pages/GeneralDetailsPage';
import './App.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        {['foods', 'drinks'].map((route) => (
          <Route
            key={ `route-${route}` }
            path={ `/${route}/:id/in-progress` }
            component={ GeneralProgressPage }
          />
        ))}
        {['foods', 'drinks'].map((route) => (
          <Route
            key={ `route-${route}` }
            path={ `/${route}/:id` }
            component={ GeneralDetailsPage }
          />
        ))}
        {['foods', 'drinks'].map((route) => (
          <Route
            key={ `route-${route}` }
            path={ `/${route}` }
            component={ GeneralPage }
          />
        ))}
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreIngredientsPage }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreIngredientsPage }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreNatPage }
        />
        <Route exact path="/explore/foods" component={ ExploreFiltersPage } />
        <Route exact path="/explore/drinks" component={ ExploreFiltersPage } />
        <Route exact path="/explore" component={ ExplorePage } />
        <Route path="/profile" component={ ProfilePage } />
        {['done', 'favorite'].map((route) => (
          <Route
            key={ `route-${route}` }
            exact
            path={ `/${route}-recipes` }
            component={ SavedRecipesPage }
          />
        ))}
        <Route exact path="/" component={ LoginPage } />
        <Route path="*" component={ NotFoundPage } />
      </Switch>
    </RecipesProvider>
  );
}
// ok

export default App;
