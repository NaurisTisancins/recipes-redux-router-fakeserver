import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';



import {
   selectRecipe,
   selectStatus,
   selectError,
   addRecipes,
   updateRecipes,
   getRecipeById,
} from './recipesSlice';


const useStyles = makeStyles({
   form: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
   },
   formTitle: {
      textAlign: 'center',
      marginTop: '3rem'
   },
   formControl: {
      width: '90%',
   }, 
   textField: {
      marginTop: '0.5rem',
   },
   buttonSubmit: {
      background: 'linear-gradient(45deg, #e8d527 30%, #ede48e 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      marginTop: '1rem'
   },
   buttonReset: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      marginTop: '1rem'
   }

})



export default function RecipeForm() {
   const recipe = useSelector(selectRecipe);
   const status = useSelector(selectStatus);
   const error = useSelector(selectError);
   
   const [id, setId] = useState('');
   const [recipeName, setRecipeName] = useState('');
   const [description, setRecipeDescription] = useState('');
   const classes = useStyles();
   
   const populateForm = (id, recipeName, description) => {
      setId(id);
      setRecipeName(recipeName);
      setRecipeDescription(description);
   }//populateform
   const dispatch = useDispatch();
   
   const paramId = useParams();

   useEffect(() => {
      if (paramId) {
         console.log(recipe)
         setId(paramId);
         populateForm(id, recipe.recipeName, recipe.description);
      }
   }, [])
   
   
   const reset = () => {
      setRecipeName('');
      setRecipeDescription('');
   }



   const onSubmit = ($e) => {
      $e.preventDefault();
      const recipeData = {
         recipeName,
         description,
      }

      //defensive checks

      if(paramId) {
         console.log(`updating ${id}`, recipeData);
         dispatch(updateRecipes([id, recipeData]));
         setId('')
      } else {
         console.log("adding");
         dispatch(addRecipes(recipeData));
      }
      reset();
   }//end of populateForm

   if(error) return <p>Error: {error}</p>;

   if(status === 'loading') return <p>Loadin ...</p>


   return (
      <Container className={classes.container}>
         <Typography
            variant="h2"
            component="div" 
            gutterBottom
            className={classes.formTitle}
         >
            Add Recipe
         </Typography>
         <form 
            onSubmit={onSubmit} 
            onReset={reset} 
            className={classes.form}
         >
            <FormControl 
               className={classes.formControl}>
               <TextField 
                  id="outlined-name"
                  label="Recipe Name"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className={classes.textField}
               />
               <TextField 
                  id="outlined-name"
                  label="Recipe Description"
                  value={description}
                  onChange={(e) => setRecipeDescription(e.target.value)}
                  className={classes.textField}
               />

               {paramId ?
                  (<Button
                     type="submit"
                  className={classes.buttonSubmit}>Update</Button>) :
                  (<Button
                  type="submit"
                  className={classes.buttonSubmit}>Submit</Button>)}
               
               <Button 
                  type="reset"
                  className={classes.buttonReset}
               >Reset</Button>

            </FormControl>
         </form>
      </Container>
   )
}