import { 
  UPDATED_RECIPE,
  RESET_RECIPE_FORM,
  RESET_INGREDIENTS,
  UPDATE_INGREDIENT,
  ADD_INGREDIENT,
  SET_CURRENT_INGREDIENT
} from '../action-types';

export const updateRecipeFormData = recipeFormData => {
  return {
    type: UPDATED_RECIPE,
    recipeFormData
  }
}

export const resetRecipeForm = () => {
  return {
    type: RESET_RECIPE_FORM
  }
}

export const resetIngredients = () => dispatch => {
  dispatch({
    type: RESET_INGREDIENTS,
    payload: null
  })
}

export const updateIngredient = (ingredient) => dispatch => {
  dispatch({
    type: UPDATE_INGREDIENT,
    payload: ingredient
  })
}

export const addIngredient = (ingredient) => dispatch => {
  dispatch({
    type: ADD_INGREDIENT,
    payload: ingredient
  })
}

export const setCurrentIngredient = (ingredient) => dispatch => {
  dispatch({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient
  })
}
