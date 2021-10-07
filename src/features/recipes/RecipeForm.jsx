import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import {
  fetchRecipes,
  selectRecipes,
  selectStatus,
  selectError,
  addRecipes,
  updateRecipes,
} from './recipesSlice';

const Form = styled('form')``;

const styles = {
  container: {

  },
  form: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  formControl: {
    width: '60%',
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
    marginTop: '1rem',
  },
  buttonReset: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '1rem',

  }
}

export default function RecipeForm() {
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const [id, setId] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [description, setRecipeDescription] = useState('');
  const history = useHistory();
  // const classes = useStyles();

  const populateForm = (id, recipeName, description) => {
    setId(id);
    setRecipeName(recipeName);
    setRecipeDescription(description);
  }//populateform
  const dispatch = useDispatch();

  const { id: paramId } = useParams();

  useEffect(() => {
    dispatch(fetchRecipes())
    if (paramId) {
      const recipeIndex = recipes.findIndex((recipe) => recipe.id === Number(paramId));
      const recipe = recipes[recipeIndex];
      populateForm(recipe.id, recipe.recipeName, recipe.description);
    }
  }, [])

  const reset = () => {
    setRecipeName('');
    setRecipeDescription('');
  }

  const redirect = () => {
    history.push('/');
  }

  const onSubmit = ($e) => {
    $e.preventDefault();
    const recipeData = {
      recipeName,
      description,
    }
    if (paramId) {
      console.log(`updating ${id}`, recipeData);
      dispatch(updateRecipes([id, recipeData]));
      setId('')
      redirect();
    } else {
      console.log("adding");
      dispatch(addRecipes(recipeData));
      redirect();
    }
    reset();
  }//end of populateForm

  if (error) return <p>Error: {error}</p>;

  if (status === 'loading') return <p>Loadin ...</p>


  return (
    <Box sx={styles.container}>
      <Typography
        variant="h2"
        component="div"
        gutterBottom
        sx={styles.formTitle}
      >
        {paramId ? "Update Recipe" : "Add Recipe"}
      </Typography>

      <Form
        onSubmit={onSubmit}
        onReset={reset}
        sx={styles.form}
      >
        <FormControl
          sx={styles.formControl}
        >
          <TextField
            id="outlined-name"
            label="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            sx={styles.textField}
          />
          <TextField
            id="outlined-name"
            label="Recipe Description"
            value={description}
            onChange={(e) => setRecipeDescription(e.target.value)}
            sx={styles.textField}
          />


          {paramId ?
            (<Button
              type="submit"
              sx={styles.buttonSubmit}
            >Update</Button>) :
            (<Button
              type="submit"
              sx={styles.buttonSubmit}
            >Submit</Button>)}

          <Button
            type="reset"
            sx={styles.buttonReset}
          >Reset</Button>

        </FormControl>
      </Form>
    </Box>
  )
}