const defaultState = {
  recipes: [],
  recipe: { name: '', ingredients: '', recipeType: '', preparationTime: 0 },
  recipeTypeFilter: 'SHOW_ALL',
  loading: false,
  nutrients: {},
  errors: {}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_RECIPES': {
      return {
        ...state,
        recipes: action.payload
      };
    }
    case 'FETCH_RECIPES_FULFILLED': {
      return {
        ...state,
        recipes: action.payload.data.data || action.payload.data // in case pagination is disabled
      };
    }
    case 'NEW_RECIPE': {
      return {
        ...state,
        nutrients: [],
        recipe: {
          name: '',
          ingredients: '',
          preparationTime: 0,
          isDessert: false
        }
      };
    }
    case 'SAVE_RECIPE_PENDING': {
      return {
        ...state,
        loading: true
      };
    }
    case 'SAVE_RECIPE_FULFILLED': {
      return {
        ...state,
        recipes: [...state.recipes, action.payload.data],
        errors: {},
        loading: false
      };
    }
    case 'SAVE_RECIPE_REJECTED': {
      const data = action.payload.response.data;
      const { name, ingredients } = data.errors;
      const errors = {
        name,
        ingredients
      };
      return {
        ...state,
        errors: errors,
        loading: false
      };
    }
    case 'FETCH_RECIPE_PENDING': {
      return {
        ...state,
        loading: true,
        nutrients: [],
        recipe: { name: '', ingredients: '' }
      };
    }

    case 'FETCH_RECIPE_FULFILLED': {
      return {
        ...state,
        nutrients: [],
        recipe: action.payload.data,
        errors: {},
        loading: false
      };
    }

    case 'UPDATE_RECIPE_PENDING': {
      return {
        ...state,
        loading: true
      };
    }

    case 'UPDATE_RECIPE_FULFILLED': {
      const recipe = action.payload.data;
      return {
        ...state,
        recipes: state.recipes.map(item =>
          item._id === recipe._id ? recipe : item
        ),
        errors: {},
        loading: false
      };
    }

    case 'UPDATE_RECIPE_REJECTED': {
      const data = action.payload.response.data;
      const { name, ingredients } = data.errors;
      const errors = {
        global: data.message,
        name,
        ingredients
      };
      return {
        ...state,
        errors: errors,
        loading: false
      };
    }

    case 'UPDATE_RECIPETYPE_FILTER': {
      const type = action.payload;
      return {
        ...state,
        recipeTypeFilter: type
      };
    }

    case 'UPDATE_SODIUM_FILTER': {
      const value = action.payload;
      return {
        ...state,
        sodiumFilter: value
      };
    }

    case 'UPDATE_FAT_FILTER': {
      const value = action.payload;
      return {
        ...state,
        fatFilter: value
      };
    }

    case 'UPDATE_DESSERT_FILTER': {
      const value = action.payload;
      return {
        ...state,
        dessertFilter: value
      };
    }

    case 'DELETE_RECIPE_FULFILLED': {
      const _id = action.payload.data._id;
      return {
        ...state,
        recipes: state.recipes.filter(item => item._id !== _id)
      };
    }

    case 'GET_NUTRITION_FULFILLED': {
      const nutrients = action.payload.data.foods;
      return {
        ...state,
        recipes: [...state.recipes],
        errors: {},
        loading: false,
        nutrients: nutrients
      };
    }

    default:
      return state;
  }
};
