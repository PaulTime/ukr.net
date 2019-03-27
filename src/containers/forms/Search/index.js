import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import BEM from 'services/bem';
import { composeValidators, required, carNumber } from 'helpers/validators';
import TextInput from 'components/TextInput';

import './index.scss';

const bem = BEM('search-form');

export default class SearchForm extends React.PureComponent {
  static displayName = 'SearchForm';

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className={bem()}>
        <Field
          name="search"
          validate={composeValidators(
            required,
            carNumber,
          )}
          component={TextInput}
          id="search"
          placeholder="Car number"
        />

        <button className={bem('submit')} type="submit">
          Search
        </button>
      </form>
    );
  }
}
