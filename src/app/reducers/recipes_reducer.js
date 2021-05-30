import isEmpty from "../../helpers/isEmpty";
import {
	ADD_RECIPE,
	DELETE_RECIPE,
  FETCH_RECIPE,
  GET_RECIPES,
	SET_RECIPE,
	RECIPE_LOADING
} from "../action-types";

const initialState = {
	loading: false,
	error: null,
	currentRecipe: {id: 0},
	all: [],
	lastId: 0,
	isCurrent: false
};

function getNextId(id) {
	return id+1;
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case RECIPE_LOADING:
			return {
				...state,
				loading: true
			}
		
    case GET_RECIPES:
      let lastId = state.lastId;
      let recipes = action.payload.all.map((recipe, i) => {
        // lastId = getNextId(lastId);
				recipe.id = i;
				lastId = recipe.id;
        return recipe;
      }); 
			return {
				...state,
				lastId: lastId,
				all: recipes,
				loading: false,
				isCurrent: false
			};

		case ADD_RECIPE: {
			let newRecipe = action.payload;
      newRecipe.id = getNextId(state.lastId);
			let allRecipes = state.all;
			return {
				...state,
				all: [ ...allRecipes, newRecipe ],
			}
		}
			
		case FETCH_RECIPE: {
			return {
				...state,
				currentRecipe: action.payload,
				all: state.all.map((recipe, i) => {
					if (recipe.id === action.payload.id) {
						return action.payload
					}
					return recipe
				}),
				loading: false,
				isCurrent: !isEmpty(action.payload)
			}
		}
			
		case SET_RECIPE:
			let newCurrent = state.currentRecipe.id === action.payload.id ? initialState.currentRecipe : action.payload;
			return {
				...state,
				currentRecipe: newCurrent,
				isCurrent: !isEmpty(action.payload)
			}
		
		case DELETE_RECIPE: {
			const others = state.all.filter(recipe => {
				return recipe.id !== action.payload
			})
			return {
				...state,
				currentRecipe: initialState.currentRecipe,
				isCurrent: false,
				all: others,
			};
		}
		
		default:
			return state;
	}
};

export default reducer;