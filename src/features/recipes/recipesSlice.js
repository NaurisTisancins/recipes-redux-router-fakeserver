import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRecipes, addRecipe, getRecipe, updateRecipe } from './recipesAPI';

const initialState = {
   recipes: [],
   recipe: {},
   status: 'idle',
   error: null,
}

export const fetchRecipes = createAsyncThunk(
   'recipes/fetchRecipes',
   async () => {
      const response = await getRecipes();
      console.log('response', response);
      return response;
   }
);//end of fetchRecipes

export const addRecipes = createAsyncThunk(
   'recipes/addRecipe',
   async (data) => {
      const response = await addRecipe(data);
      console.log('response', response);
      return response;
   }
);//end of addRecipes

export const getRecipeById = createAsyncThunk(
   'recipes/getRecipe',
   async (data) => {
      const response = await getRecipe(data);
      console.log('get Recipe', response);
      return response;
   }
);//end of GetRecipeById

export const updateRecipes = createAsyncThunk(
   'recipes/updateRecipes',
   async ([id, data]) => {
      console.log(id, data);
      await updateRecipe(id, data);
      return [id, data];
   }
);//end of updateRecipes

//Slice
export const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchRecipes.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchRecipes.fulfilled, (state, action) => {
            state.status = 'idle';
            state.recipes = action.payload;
         })
         .addCase(fetchRecipes.rejected, (state, action) => {
            state.status = 'errored';
            state.error = action.error.message;
         });

      builder
         .addCase(addRecipes.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(addRecipes.fulfilled, (state, action) => {
            state.status = 'idle';
            state.recipes.push(action.payload);
         })
         .addCase(addRecipes.rejected, (state, action) => {
            state.status = 'errored';
            state.error = action.error.message;
         })

      builder
         .addCase(getRecipeById.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getRecipeById.fulfilled, (state, action) => {
            state.status = 'idle';
            state.recipe = action.payload;
         })
         .addCase(getRecipeById.rejected, (state, action) => {
            state.status = 'errored';
            state.error = action.error.message;
            
         })
      
      builder
         .addCase(updateRecipes.pending, (state) => {
         state.status = 'loading';
         })
         .addCase(updateRecipes.fulfilled, (state, action) => {
            state.status = 'idle';
            const [id, changes] = action.payload;
            const idx = state.recipes.findIndex((recipe) => recipe.id === id);
            state.recipes[idx] = {
               ...state.recipes[idx],
               ...changes,
            };
         })
         .addCase(updateRecipes.rejected, (state, action) => {
            state.status = 'errored';
            state.error = action.error.message;
         })
   }
})

export const selectStatus = (state) => state.recipes.status;
export const selectRecipes = (state) => state.recipes.recipes;
export const selectRecipe = (state) => state.recipes.recipe;
export const selectError = (state) => state.recipes.error;

export default recipesSlice.reducer;