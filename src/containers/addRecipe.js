import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import {
  newRecipe,
  saveRecipe,
  fetchRecipe,
  updateRecipe,
  getNutrition
} from '../actions/recipeActions';
import AddRecipe from '../components/addRecipe';

class AddRecipePage extends Component {
  state = {
    redirect: false
  };

  componentDidMount = () => {
    const { _id } = this.props.match.params;

    if (_id) {
      this.props.fetchRecipe(_id).then(a => {
        this.calculateNutritionFacts(a.value.data.ingredients);
      });
    } else {
      this.props.newRecipe();
    }
  };

  reducerGenerator = val => {
    return (acc, curr) => {
      const value = `nf_${val}`;
      return acc + curr[value];
    };
  };

  submit = recipe => {
    const totalCalories = parseInt(
      this.props.nutrients.reduce(this.reducerGenerator('calories'), 0)
    );
    const totalFat = parseInt(
      this.props.nutrients.reduce(this.reducerGenerator('total_fat'), 0)
    );
    const totalProtien = parseInt(
      this.props.nutrients.reduce(this.reducerGenerator('protein'), 0)
    );
    const totalSodium = parseInt(
      this.props.nutrients.reduce(this.reducerGenerator('sodium'), 0)
    );
    const totalSugars = parseInt(
      this.props.nutrients.reduce(this.reducerGenerator('sugars'), 0)
    );
    const numberOfServings = parseInt(
      this.props.form.recipe.values.numberOfServings
    );
    const valueCalories = totalCalories / numberOfServings;
    const valueSodium = totalSodium / numberOfServings;
    const valueTotalFat = totalFat / numberOfServings;
    const valueProteins = totalProtien / numberOfServings;
    const valueSugars = totalSugars / numberOfServings;

    const recipeWithNutritionData = {
      ...recipe,
      valueCalories,
      valueSodium,
      valueTotalFat,
      valueProteins,
      valueSugars
    };
    if (!recipe._id) {
      return this.props
        .saveRecipe(recipeWithNutritionData)
        .then(response => this.setState({ redirect: true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors);
        });
    } else {
      return this.props
        .updateRecipe(recipeWithNutritionData)
        .then(response => this.setState({ redirect: true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors);
        });
    }
  };

  calculateNutritionFacts = ingredients => {
    const { getNutrition } = this.props;
    const nutritionPayload = {
      query: ingredients,
      line_delimited: true
    };
    return getNutrition(nutritionPayload);
  };

  render() {
    const numberOfServings =
      this.props.form.hasOwnProperty('recipe') &&
      !this.props.form.recipe.submitSucceeded
        ? this.props.form.recipe.values.numberOfServings
        : 1;
    return (
      <div style={{ marginTop: 80 }}>
        <div className="ui" style={{ marginTop: 20 }}>
          <NavLink className="item" activeClassName="active" exact to="/">
            <Button icon labelPosition="left">
              <Icon name="left arrow" />
              Back to All Recipies
            </Button>
          </NavLink>
        </div>
        {this.state.redirect ? (
          <Redirect to="/" />
        ) : (
          <AddRecipe
            recipe={this.props.recipe}
            loading={this.props.loading}
            onSubmit={this.submit}
            calculateNutritionFacts={this.calculateNutritionFacts}
            nutrients={this.props.nutrients}
            numberOfServings={numberOfServings}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
    recipe: state.recipes.recipe,
    nutrients: state.recipes.nutrients || [],
    errors: state.recipes.errors
  };
}

const mapDispatchToProps = {
  newRecipe,
  saveRecipe,
  fetchRecipe,
  updateRecipe,
  getNutrition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecipePage);
