import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   useParams
} from 'react-router-dom';

import {

   selectRecipe,
   selectError,
   selectStatus,
} from './recipesSlice';

export default function OpenRecipe() {


   
   const id = useParams();


   

   return (
      <div>
         <p>got this id from params {id.id}</p>
      </div>
   )
}