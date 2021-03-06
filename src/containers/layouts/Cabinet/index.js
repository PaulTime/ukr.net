import React from 'react';
import PropTypes from 'prop-types';

import BEM from 'services/bem';
import Header from 'containers/blocks/Header';

import './index.scss';

const bem = BEM('layout');

export default class CabinetLayout extends React.PureComponent {
  static displayName = 'CabinetLayout';

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={bem()}>
        <Header />
        <main className={bem('content')}>{this.props.children}</main>
      </div>
    );
  }
}
