import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container, Menu, Image } from 'semantic-ui-react';
import AddRecipePage from './containers/addRecipe';
import RecipeListPage from './containers/recipeList';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Container>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <NavLink exact to="/">
                My Recipes
              </NavLink>
            </Menu.Item>
          </Container>
        </Menu>
        <Route exact path="/" component={RecipeListPage} />
        <Route path="/recipes/new" component={AddRecipePage} />
        <Route path="/recipes/edit/:_id" component={AddRecipePage} />
      </Container>
    );
  }
}

export default App;
