import React from 'react';

import {
   Switch,
   Route
} from 'react-router-dom';


import RecipesList from './features/recipes/RecipesList';
import RecipeForm from './features/recipes/RecipeForm';
import OpenRecipe from './features/recipes/OpenRecipe';


function App() {

   return (
      <>
         <Switch>
            <Route exact path="/">
               <RecipesList />
            </Route>
            <Route exact path="/recipes/add">
               <RecipeForm />
            </Route>
            <Route exact path="/recipes/:id">
               <OpenRecipe />
            </Route>
            <Route exact path="/recipes/update/:id">
               <RecipeForm />
            </Route>
         </Switch>
      </>
   );
}

export default App;
