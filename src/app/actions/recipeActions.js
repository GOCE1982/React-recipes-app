import {
  SET_RECIPE,
  EDIT_RECIPE,
  UPDATED_RECIPE,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_RECIPE
} from '../action-types';

import {
  setRecipes,
  removeRecipe,
  getRecipe,
} from '../action-creators';

export const getAllRecipes = (recipes) => dispatch => {
  dispatch(setRecipeLoading())
  dispatch(setRecipes(recipes))
};

export const fetchRecipe = (recipe) => dispatch => {
  dispatch(getRecipe(recipe))
};

export const createRecipe = (recipe, routerHistory) => dispatch => {
  try {
    dispatch({
      type: ADD_RECIPE,
      payload: recipe
    });
    routerHistory.replace('/');
  } catch (err) {
    dispatch({
      type: 'ERROR',
      payload: err.message
    })
    routerHistory.push('/new');
  }
};

export const deleteRecipe = (recipeId, routerHistory) => dispatch => {
  try {
    dispatch(removeRecipe(recipeId));
    routerHistory.replace('/');
  } catch (err) {
    dispatch({
      type: 'ERROR',
      payload: err.message
    })
  }
};

export const setCurrentRecipe = (recipe) => {
  return {
    type: SET_RECIPE,
    payload: recipe
  }
};

export const setRecipeLoading = () => {
  return {
    type: 'RECIPE_LOADING'
  }
}

export const editRecipe = () => {
  return {
    type: EDIT_RECIPE
  }
};

export const updateRecipe = (recipe) => {
  return {
    type: UPDATED_RECIPE,
    payload: recipe
  }
};

export const openModal = (size, dimmer) => {
  return {
    type: OPEN_MODAL,
    size: size,
    dimmer: dimmer
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  }
}
