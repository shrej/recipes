import { combineReducers } from 'redux';
import RecipeReducer from './recipeReducers';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  recipes: RecipeReducer,
  form: formReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
