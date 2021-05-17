import { 
  GET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE
} from '../action-types';

export const setRecipes = recipes => {
  return {
    type: GET_RECIPES,
    payload: recipes
  }
}

export const addRecipe = recipe => {
  return {
    type: ADD_RECIPE,
    payload: recipe
  }
}

export const removeRecipe = recipe => {
  return {
    type: DELETE_RECIPE,
    payload: recipe
  }
}
