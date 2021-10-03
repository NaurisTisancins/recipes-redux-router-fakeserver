import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   useParams
} from 'react-router-dom';

import {
   getRecipeById,
   selectRecipe,
   selectError,
   selectStatus,
} from './recipesSlice';

export default function OpenRecipe() {
   const recipe = useSelector(selectRecipe);
   const dispatch = useDispatch()
   
   const id = useParams();

   useEffect(() => {
      dispatch(getRecipeById(id));
   }, [])
   

   return (
      <div>
         <p>got this id from params {id.id}</p>
      </div>
   )
}