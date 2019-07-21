import React, { Component } from 'react';
import { Form, Grid, Button, Dropdown } from 'semantic-ui-react';
import Checkbox from './form/checkboxToggle';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import ShowNutrition from './showNutrition';

const recipeTypeOptions = [
  { key: 'lunch', text: 'Lunch', value: 'lunch' },
  { key: 'dinner', text: 'Dinner', value: 'dinner' },
  { key: 'breakfast', text: 'Breakfast', value: 'breakfast' }
];

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipeType: this.props.recipe.recipeType,
      isDessert: this.props.recipe.isDessert
    };
  }

  onRecipeTypeChange = (event, { value }) => {
    this.setState({ selectedRecipeType: value });
  };

  toggleCheckBox = (a, b) => {
    this.setState({ isDessert: b.value });
  };

  renderInputField = ({
    input,
    label,
    type,
    min,
    max,
    meta: { touched, error }
  }) => (
    <Form.Field className={classnames({ error: touched && error })}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} min={min} max={max} />
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  );

  renderTimePickerField = ({ input, label, meta: { touched, error } }) => (
    <Form.Field className={classnames({ error: touched && error })}>
      <Form.Input
        {...input}
        label={`Preparation Time: ${input.value} minutes`}
        type="range"
        min={0}
        max={120}
        name="preparationTime"
        step={1}
        value={input.value}
      />
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  );

  renderTextAreaField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({ error: touched && error })}>
      <label>{label}</label>
      <Form.TextArea
        {...input}
        placeholder={label}
        type={type}
        style={{ minHeight: 200 }}
      />
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  );

  renderSelect = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({ error: touched && error })}>
      <label>{label}</label>
      <Dropdown
        label={label}
        fluid
        selection
        {...input}
        options={recipeTypeOptions}
        value={input.value}
        type={type}
        placeholder={label}
        onChange={(param, data) => input.onChange(data.value)}
      />
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  );

  componentWillReceiveProps = nextProps => {
    // Receive Recipe data Asynchronously
    const { recipe } = nextProps;
    if (recipe._id !== this.props.recipe._id) {
      // Initialize form only once
      this.props.initialize(recipe);
    }
  };

  componentDidMount = () => {
    const recipe = this.props.recipe;
    this.props.initialize(recipe);
  };

  render() {
    const {
      handleSubmit,
      numberOfServings,
      nutrients,
      pristine,
      submitting,
      loading
    } = this.props;

    return (
      <Grid columns={2}>
        <Grid.Column>
          <h1 style={{ marginTop: '1em' }}>
            {this.props.recipe._id ? this.props.recipe.name : 'Add New Recipe'}
          </h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field
              name="preparationTime"
              type="text"
              component={this.renderTimePickerField}
              label="Preparation Time"
            />
            <Field
              name="name"
              type="text"
              component={this.renderInputField}
              label="Recipe Name"
            />
            <Field
              name="numberOfServings"
              type="number"
              component={this.renderInputField}
              label="Number of Servings"
              min={1}
              max={10}
            />
            <Field
              name="recipeType"
              type="text"
              component={this.renderSelect}
              label="Recipe Type"
            />
            <Field
              name="ingredients"
              type="text"
              component={this.renderTextAreaField}
              label="Ingredients"
            />
            <Field
              name="recipeSteps"
              type="text"
              component={this.renderTextAreaField}
              label="Recipe Steps"
            />
            <Field
              style={{ marginTop: '10px', marginBottom: '20px' }}
              name="isDessert"
              type="text"
              component={Checkbox}
              onChange={this.toggleCheckBox}
              checked={this.state.isDessert}
              label="This is a Dessert ? "
            />
            <Button primary type="submit" disabled={pristine || submitting}>
              Save
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <ShowNutrition
            nutrients={nutrients}
            numberOfServings={numberOfServings}
            name="showNutrition"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'recipe'
})(AddRecipe);
