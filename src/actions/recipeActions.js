import { client, getNutrionalValue } from './';
const url = '/recipe';

export function fetchRecipes() {
  return dispatch => {
    dispatch({
      type: 'FETCH_RECIPES',
      payload: client.get(url)
    });
  };
}

export function newRecipe() {
  return dispatch => {
    dispatch({
      type: 'NEW_RECIPE'
    });
  };
}

export function saveRecipe(recipe) {
  return dispatch => {
    return dispatch({
      type: 'SAVE_RECIPE',
      payload: client.post(url, recipe)
    });
  };
}

export function fetchRecipe(_id) {
  return dispatch => {
    return dispatch({
      type: 'FETCH_RECIPE',
      payload: client.get(`${url}/${_id}`)
    });
  };
}

export function updateRecipe(recipe) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_RECIPE',
      payload: client.put(`${url}/${recipe._id}`, recipe)
    });
  };
}

export function deleteRecipe(_id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_RECIPE',
      payload: client.delete(`${url}/${_id}`)
    });
  };
}

export function updateRecipeTypeFilter(type) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_RECIPETYPE_FILTER',
      payload: type
    });
  };
}

export function updateSodiumFilter(value) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_SODIUM_FILTER',
      payload: value
    });
  };
}

export function updateFatFilter(value) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_FAT_FILTER',
      payload: value
    });
  };
}

export function updateDessertFilter(value) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_DESSERT_FILTER',
      payload: value
    });
  };
}

export function updatePreparationTimeFilter(time) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_PREPARATIONTIME_FILTER',
      payload: time
    });
  };
}

export function getNutrition(ing) {
  return dispatch => {
    return dispatch({
      type: 'GET_NUTRITION',
      payload: getNutrionalValue(ing)
    });
  };
}
