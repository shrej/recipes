import React from 'react';
import { Dropdown, Message, Grid, Checkbox, Menu } from 'semantic-ui-react';
import RecipeCard from './recipeCard';
export default function RecipeList({
  recipes,
  onRecipeTypeChange,
  onSodiumFilterChange,
  onFatFilterChange,
  onDessertFilterChange,
  deleteRecipe
}) {
  const capitalize = str => {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filterByTypeOptions = [
    { key: 'lunch', value: 'lunch', text: 'Lunch' },
    { key: 'breakfast', value: 'breakfast', text: 'Breakfast' },
    { key: 'dinner', value: 'dinner', text: 'Dinner' },
    { key: 'all', value: 'all', text: 'All Recipies' }
  ];

  const handleFilterDropDownChange = (event, data) => {
    const { value } = data;
    const mealType = value.toUpperCase();
    onRecipeTypeChange(`SHOW_${mealType}`);
  };

  const toggleSodiumFilter = (event, data) => {
    const { checked } = data;
    if (checked) {
      onSodiumFilterChange(`SHOW_LOW_SODIUM`);
    } else {
      onSodiumFilterChange(`SHOW_ALL`);
    }
  };

  const toggleFatFilter = (event, data) => {
    const { checked } = data;
    if (checked) {
      onFatFilterChange(`SHOW_LOW_FAT`);
    } else {
      onFatFilterChange(`SHOW_ALL`);
    }
  };

  const toggleDessertFilter = (event, data) => {
    const { checked } = data;
    if (checked) {
      onDessertFilterChange(`SHOW_DESSERTS`);
    } else {
      onDessertFilterChange(`SHOW_ALL`);
    }
  };

  return (
    <React.Fragment>
      <Menu borderless>
        <Menu.Item>
          <Dropdown
            placeholder="Filter By Recipe Type"
            search
            selection
            clearable
            options={filterByTypeOptions}
            onChange={handleFilterDropDownChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            className="inverted-checkbox"
            label="Low Sodium"
            name="low_sodium"
            onChange={toggleSodiumFilter}
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            label="Low Fat"
            name="low_fat"
            onChange={toggleFatFilter}
            className="inverted-checkbox"
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            label="Show Only Desserts"
            name="dessert"
            onChange={toggleDessertFilter}
            className="inverted-checkbox"
          />
        </Menu.Item>
      </Menu>
      <Grid relaxed columns={4} style={{ marginTop: '40px' }}>
        {recipes.length > 0 &&
          recipes.map(recipe => {
            return (
              <Grid.Column key={recipe._id}>
                <RecipeCard
                  recipeName={recipe.name}
                  prepTime={recipe.preparationTime}
                  id={recipe._id}
                  key={recipe._id}
                  type={capitalize(recipe.recipeType)}
                  ingredients={recipe.ingredients}
                  deleteRecipe={deleteRecipe}
                />
              </Grid.Column>
            );
          })}

        {!recipes.length && (
          <Message
            icon="food"
            header="No recipes"
            negative
            content="Please add your first recipe, or adjust the filters"
          />
        )}
      </Grid>
    </React.Fragment>
  );
}
