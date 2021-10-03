import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

import {
   selectRecipe,
   getRecipeById,
} from './recipesSlice';


export default function Cards({ id, name, desc }) {
   const recipe = useSelector(selectRecipe);

   const dispatch = useDispatch();
   return (
      <Card sx={{ maxWidth: 345 }}>
         {/* <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
         /> */}
         <CardContent style={{ textAlign: 'center' }}>
            <NavLink exact to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
               <Typography gutterBottom variant="h5" component="div">
                  {name}
               </Typography>
            </NavLink>
            <Typography variant="body2" color="text.secondary">
               {desc}
            </Typography>
         </CardContent>
         <CardActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NavLink exact to={`/recipes/update/${id}`}>
               <Button
                  style={{ padding: '0 1.5rem 0 1.5rem' }} size="medium"
               >update</Button>
            </NavLink>

            <Button style={{ padding: '0 1.5rem 0 1.5rem' }} size="medium">delete</Button>
         </CardActions>
      </Card>
   )
}