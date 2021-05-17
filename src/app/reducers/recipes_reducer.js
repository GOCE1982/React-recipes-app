import {
	ADD_RECIPE,
	DELETE_RECIPE,
  FETCH_RECIPE,
  GET_RECIPES
} from "../action-types";

const initialState = {
	loading: false,
	error: null,
	currentRecipe: {id: 0},
	all: [],
	lastId: 0,
};

function getNextId(id) {
	return id+1;
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      let lastId = state.lastId;
      let recipes = action.payload.all.map((recipe, i) => {
				// lastId = getNextId(lastId);
				lastId = i;
				recipe.id = lastId;
				lastId = recipe.id;
        return recipe;
      }); 
      return Object.assign({}, state, {lastId: lastId}, {all: recipes}); 
		case ADD_RECIPE: {
			let newRecipe = action.payload;
      newRecipe.id = getNextId(state.lastId);
      let allRecipes = state.all;
      allRecipes.push(newRecipe);
      return Object.assign({}, state, {all: allRecipes});
		}
		case FETCH_RECIPE: {
			const { all } = state;
			if (action.payload !== 0) {
				
				return Object.assign({}, state,
					{currentRecipe: action.payload},
					{all: all.map(recipe => {
						if (recipe.id === action.payload.id) {
							return action.payload
						}
						return recipe
					})
				});
			}
			return {
				...state,
				currentRecipe: {}
			};
		}
		case DELETE_RECIPE: {
			// const parentKey = Object.keys(state.recipes.all).filter(
			// 	key => state.recipes.all[key].id === action.payload
			// )[0];
			// const { [parentKey]: value, ...others } = state.recipes;
			// if (state.currentRecipe.id === action.payload) {
			// 	state.currentRecipe = {};
			// }
			const others = state.all.filter(recipe => {
				return recipe.id !== action.payload
			})
			return {
				...state,
				all: others
			};
		}
		
		default:
			return state;
	}
};

export default reducer;