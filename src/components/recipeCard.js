import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RecipeCard = props => {
  const { recipeName, prepTime, id, type, deleteRecipe } = props;
  return (
    <Card
      header={recipeName}
      meta={type}
      description={`${prepTime} minutes`}
      extra={
        <>
          <Link to={`/recipes/edit/${id}`}>
            <Button color="purple">Details</Button>
          </Link>
          <Button
            icon="trash"
            color="red"
            onClick={() => {
              console.log('here');
              if (
                window.confirm(`Are you sure you want to delete ${recipeName}`)
              ) {
                deleteRecipe(id);
              }
            }}
          />
        </>
      }
    />
  );
};
export default RecipeCard;
