import React from 'react';

import BEM from 'services/bem';

import './index.scss';

const bem = BEM('text-input');

export default class TextInput extends React.PureComponent {
  static displayName = 'TextInput';

  render() {
    const { input, meta, id, placeholder } = this.props;

    return (
      <label htmlFor={id} className={bem()}>
        <input
          type="text"
          {...input}
          id={id}
          placeholder={placeholder}
        />

        {meta.touched && meta.error && (
          <span className={bem('error')}>{meta.error}</span>
        )}
      </label>
    );
  }
}
