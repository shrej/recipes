import { createSelector } from 'reselect';
import _ from 'lodash';

const getRecipeTypeFilter = state => state.recipes.recipeTypeFilter;
const getRecipeSodiumFilter = state => state.recipes.sodiumFilter;
const getRecipeFatFilter = state => state.recipes.fatFilter;
const getRecipeDessertFilter = state => state.recipes.dessertFilter;
const getrecipes = state => state.recipes.recipes;

export const getRecipeBasedOnType = createSelector(
  [getRecipeTypeFilter, getrecipes],
  (recipeTypeFilter, recipes) => {
    switch (recipeTypeFilter) {
      case 'SHOW_ALL':
        return recipes;
      case 'SHOW_LUNCH':
        return recipes.filter(t => t.recipeType === 'lunch');
      case 'SHOW_DINNER':
        return recipes.filter(t => t.recipeType === 'dinner');
      case 'SHOW_BREAKFAST':
        return recipes.filter(t => t.recipeType === 'breakfast');
      default:
        return recipes;
    }
  }
);

export const getRecipeBasedOnSodiumFilter = createSelector(
  [getRecipeSodiumFilter, getrecipes],
  (recipeSodiumFilter, recipes) => {
    switch (recipeSodiumFilter) {
      case 'SHOW_ALL':
        return recipes;
      case 'SHOW_LOW_SODIUM':
        return recipes.filter(t => t.valueSodium < 500);
      default:
        return recipes;
    }
  }
);

export const getRecipeBasedOnFatFilter = createSelector(
  [getRecipeFatFilter, getrecipes],
  (recipeFatFilter, recipes) => {
    switch (recipeFatFilter) {
      case 'SHOW_ALL':
        return recipes;
      case 'SHOW_LOW_FAT':
        return recipes.filter(t => t.valueTotalFat < 50);
      default:
        return recipes;
    }
  }
);

export const getRecipeBasedOnDessertFilter = createSelector(
  [getRecipeDessertFilter, getrecipes],
  (recipeDessertFilter, recipes) => {
    switch (recipeDessertFilter) {
      case 'SHOW_ALL':
        return recipes;
      case 'SHOW_DESSERTS':
        return recipes.filter(t => t.isDessert === true);
      default:
        return recipes;
    }
  }
);

export const getFilteredRecipies = createSelector(
  getRecipeBasedOnType,
  getRecipeBasedOnSodiumFilter,
  getRecipeBasedOnFatFilter,
  getRecipeBasedOnDessertFilter,
  (first, second, third, fourth) => _.intersection(first, second, third, fourth)
);
