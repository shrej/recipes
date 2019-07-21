import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeList from '../components/recipeList';
import {
  fetchRecipes,
  updateRecipeTypeFilter,
  updateSodiumFilter,
  updateFatFilter,
  updateDessertFilter,
  deleteRecipe
} from '../actions/recipeActions';
import { NavLink } from 'react-router-dom';

import { getFilteredRecipies } from '../selectors';

class RecipeListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <div className="ui right floated button positive primary">
          <NavLink
            className="link-item"
            activeClassName="active"
            exact
            to="/recipes/new"
          >
            Add New Recipe
          </NavLink>
        </div>
        <h1>List of Recipes</h1>
        <RecipeList
          recipes={this.props.recipes}
          onRecipeTypeChange={this.props.updateRecipeTypeFilter}
          onPreparationTimeChange={this.props.updatePreparationTimeFilter}
          deleteRecipe={this.props.deleteRecipe}
          onSodiumFilterChange={this.props.updateSodiumFilter}
          onFatFilterChange={this.props.updateFatFilter}
          onDessertFilterChange={this.props.updateDessertFilter}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    recipes: getFilteredRecipies(state)
  };
}

export default connect(
  mapStateToProps,
  {
    fetchRecipes,
    updateRecipeTypeFilter,
    updateSodiumFilter,
    updateFatFilter,
    updateDessertFilter,
    deleteRecipe
  }
)(RecipeListPage);
