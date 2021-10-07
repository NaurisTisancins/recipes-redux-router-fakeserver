import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink, useHistory } from 'react-router-dom';

import {
  removeRecipes,
} from './recipesSlice';



const styles = {
  card: {
    maxWidth: 345
  },
  cardTitle: {
    textDecoration: 'none',
    fontWeight: '700',
    color: 'black',
    '&:hover': {
      color: 'teal',
    }
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
  },
  buttonUpdate: {
    background: 'linear-gradient(45deg, #e8d527 30%, #ede48e 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 20px',
    marginTop: '1rem',
  },
  buttonDelete: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 20px',
    marginTop: '1rem',
  }
}

export default function Cards({ id, name, desc }) {

  const dispatch = useDispatch();
  const history = useHistory()

  const deleteRecipe = (id) => {
    dispatch(removeRecipes(id));
    history.push('/');
  }

  return (
    <Card sx={styles.card}>
      <CardContent style={{ textAlign: 'center' }}>
        <NavLink exact to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={styles.cardTitle}
          >
            {name}
          </Typography>
        </NavLink>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={styles.cardActions}>
        <NavLink
          exact
          to={`/recipes/update/${id}`}
          style={{ textDecoration: 'none' }}
        >
          <Button
            sx={styles.buttonUpdate}
            size="small"
          >update</Button>
        </NavLink>

        <Button
          sx={styles.buttonDelete}
          size="small"
          onClick={() => deleteRecipe(id)}
        >delete</Button>
      </CardActions>
    </Card>
  )
}