import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from './recipesAPI';

const initialState = {
   recipes: [],
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



export const updateRecipes = createAsyncThunk(
   'recipes/updateRecipes',
   async ([id, data]) => {
      console.log(id, data);
      await updateRecipe(id, data);
      return [id, data];
   }
);//end of updateRecipes

export const removeRecipes = createAsyncThunk(
   'recipes/removeRecipes',
   async (id) => {
      await deleteRecipe(id);
      return id;
   }
)

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

      builder
         .addCase(removeRecipes.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(removeRecipes.fulfilled, (state, action) => {
            state.status = 'idle';
            console.log('id', action.payload);
            const idx = state.recipes.findIndex(({ id }) => {
               return id === action.payload;
            })
            state.recipes = [...state.recipes.slice(0, idx), ...state.recipes.slice(idx + 1)];
         })
         .addCase(removeRecipes.rejected, (state, action) => {
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