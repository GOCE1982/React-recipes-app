import {
  FETCH_RECIPE,
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
} from '../action-creators';

export const getAllRecipes = (recipes) => {
  return setRecipes(recipes)
};

export const fetchRecipe = (recipeId) => {
  return {
    type: FETCH_RECIPE,
    payload: recipeId
  }
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
    routerHistory.push('/');
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
