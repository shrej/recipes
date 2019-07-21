import React, { Component } from 'react';
import $ from 'jquery';
window.jQuery = window.$ = $;
require('nutrition-label-jquery-plugin');

class ShowNutrition extends Component {
  getNutritionValues(nutrition) {
    const reducerGenerator = val => {
      return (acc, curr) => {
        const value = `nf_${val}`;
        return acc + curr[value];
      };
    };
    const valueCalories = nutrition.reduce(reducerGenerator('calories'), 0);
    const valueTotalFat = nutrition.reduce(reducerGenerator('total_fat'), 0);
    const valueSatFat = nutrition.reduce(reducerGenerator('saturated_fat'), 0);
    const valueCholesterol = nutrition.reduce(
      reducerGenerator('cholesterol'),
      0
    );
    const valueSodium = nutrition.reduce(reducerGenerator('sodium'), 0);
    const valueTotalCarb = nutrition.reduce(
      reducerGenerator('total_carbohydrate'),
      0
    );
    const valueSugars = nutrition.reduce(reducerGenerator('sugars'), 0);
    const valueProtiens = nutrition.reduce(reducerGenerator('protein'), 0);
    const ingredientList = nutrition.reduce((acc, curr) => {
      return acc.concat(curr.food_name);
    }, []);
    const ingredientListString = ingredientList.join(', ');

    return {
      valueCalories,
      valueTotalFat,
      valueSatFat,
      valueCholesterol,
      valueSodium,
      valueTotalCarb,
      valueSugars,
      valueProtiens,
      ingredientListString
    };
  }

  render() {
    const nutrients = this.props.nutrients.length ? this.props.nutrients : [];
    const numberOfServings = this.props.numberOfServings || 1;
    if (nutrients.length > 0) {
      const nutritionValues = this.getNutritionValues(
        nutrients,
        numberOfServings
      );
      $('#nutrition-facts').nutritionLabel({
        showServingsPerContainer: true,
        showItemName: false,
        valueServingUnitQuantity: 0,
        naPolyFat: true,
        naFibers: true,
        showMonoFat: false,
        showTransFat: false,
        showVitaminD: false,
        showVitaminC: false,
        showCalcium: false,
        showIron: false,

        valueCalories: nutritionValues.valueCalories / numberOfServings,
        valueTotalFat: nutritionValues.valueTotalFat / numberOfServings,
        valueSatFat: nutritionValues.valueSatFat / numberOfServings,
        valueCholesterol: nutritionValues.valueCholesterol / numberOfServings,
        valueSodium: nutritionValues.valueSodium / numberOfServings,
        valueTotalCarb: nutritionValues.valueTotalCarb / numberOfServings,
        valueSugars: nutritionValues.valueSugars / numberOfServings,
        valueProteins: nutritionValues.valueProtiens / numberOfServings,

        ingredientList: nutritionValues.ingredientListString,
        showLegacyVersion: false
      });
    }

    return <div id="nutrition-facts" />;
  }
}

export default ShowNutrition;
