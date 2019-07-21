import React from 'react';
import { Field } from 'redux-form';
import { Checkbox as CheckboxUI } from 'semantic-ui-react';

const Checkbox = ({
  input: { value, onChange, label, ...input },
  meta: { touched, error },
  ...rest
}) => (
  <div>
    <CheckboxUI
      {...input}
      {...rest}
      checked={Boolean(value)}
      onChange={(e, data) => onChange(data.checked)}
      type="checkbox"
      name="isADessert"
      toggle
      label="This is a Dessert"
    />
    {touched && error && <span>{error}</span>}
  </div>
);

Checkbox.defaultProps = {
  input: null,
  meta: null
};

export default props => <Field {...props} component={Checkbox} />;
