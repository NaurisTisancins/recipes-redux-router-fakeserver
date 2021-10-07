import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cards from './Cards';


import {
   fetchRecipes,
   selectRecipes,
   selectError,
   selectStatus,
} from './recipesSlice';
// import styles from './Recipes.module.css';

const styles = {
   recipeListTitle: {
      textAlign: 'center',
      marginTop: '1rem'
   },
   gridContainer: {
      marginTop: '1rem',
      width: '100%',
   },
   gridItem: {
      maxWidth: '100%',
      margin: 0
   }
}


export default function RecipesList() {
   const recipes = useSelector(selectRecipes);
   const status = useSelector(selectStatus);
   const error = useSelector(selectError);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchRecipes());
   }, []);

   if (error) return <p>Error: {error}</p>;

   if (status === 'loading') return <p>Loadin ...</p>

   return (

      <Container className={styles.gridContainer}>
         <Typography
            variant="h2"
            component="div"
            gutterBottom
            sx={styles.recipeListTitle}
       >Our Recipes</Typography>
       
         <Grid
            container
         spacing={1}
         sx={styles.gridContainer}
         >
            {recipes.map(({ id, recipeName, description }) => {
               return (
                  <Grid
                     item
                     key={id}
                     xs={12}
                     sm={6}
                     md={4}
                     xl={2}>
                     <Cards
                        value={id}
                        name={recipeName}
                        desc={description}
                        id={id} />
                  </Grid>
               )
            })}
         </Grid>
      </Container>
   )


}