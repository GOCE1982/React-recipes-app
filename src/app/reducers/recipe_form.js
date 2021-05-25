import { 
  ADD_INGREDIENT,
  GET_INGREDIENTS,
  RESET_INGREDIENTS,
  UPDATE_INGREDIENT,
  UPDATED_RECIPE,
  RESET_RECIPE_FORM
} from '../action-types';

const initialState = {
  name: '',
  source: '',
  ingredients: [],
  preparation_time: {},
  instructions: '',
  currentIngredient: { id: 0 },
}

function getNextId(lastId) {
  return lastId + 1;
}

export const recipeFormData = (state = initialState, action) => {
  switch (action.type) {
    case UPDATED_RECIPE:
      return action.recipeFormData;

    case RESET_RECIPE_FORM:
      return initialState;
    
    case RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...initialState.ingredients
        ]
      }
    
    case UPDATE_INGREDIENT: 
      return Object.assign({}, state, { currentIngredient: action.payload }, {
        ingredients: state.ingredients.map(ingredient => {
          if (ingredient.id === action.payload) {
            return action.payload
          }
          return ingredient;
      })})
    
    case ADD_INGREDIENT:
      let newIngredient = action.payload;
      // newIngredient.id = state.currentIngredient.id;
      newIngredient.id = getNextId(state.currentIngredient.id);
      let allIngredients = state.ingredients;
      allIngredients.push(newIngredient);
      return Object.assign({}, state, { ingredients: allIngredients });
    
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      }
    
    case 'SET_PREPARATION_TIME':
      let newHours = action.payload.hours;
      let newMinutes = action.payload.minutes;
      return {
        ...state,
        preparation_time: {
          newHours,
          newMinutes
        }
      }

    default:
      return state;
  }
};

export default recipeFormData;