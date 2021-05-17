import { combineReducers } from 'redux';
import recipes_reducer from './recipes_reducer';
import recipeFormData from './recipe_form';
import modal_reducer from './modal_reducer';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const reducers = combineReducers({
  recipes: recipes_reducer,
  recipeForm: recipeFormData,
  modal: modal_reducer,
  router: connectRouter(history)
});

export default reducers;
