import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import qs from 'query-string';

/**
 *  LayoutRoute
 *  Usage:
 *
 *  import { Route } from 'react-router-dom'
 *
 *  import LayoutRoute 'components/LayoutRoute'
 *  import YourLayoutComponent 'components/YourLayoutComponent'
 *  import BlockComponent 'components/BlockComponent'
 *
 *  <LayoutRoute
 *    path="/page-name"
 *    component={YourLayoutComponent}
 *  >
 *    <Route
 *      path="/sub-page#1-name"
 *      component={BlockComponent}
 *    />
 *  </LayoutRoute>
 * */
export default class LayoutRoute extends React.Component {
  static displayName = 'LayoutRoute';

  static propTypes = {
    path: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  };

  static defaultProps = {
    component: React.Fragment,
  };

  get location() {
    const { location } = this.props;

    return {
      ...location,
      query: qs.parse(location.search),
    }
  }

  clone = child =>
    React.cloneElement(child, {
      path: `${this.props.path || ''}${child.props.path || ''}`,
    });

  render() {
    const {
      children, component: Component, path, ...rest
    } = this.props;

    return (
      <Route
        path={path}
        render={() => (
          <Component>
            <Switch location={this.location}>
              {React.Children.map(children, this.clone)}
            </Switch>
          </Component>
        )}
        {...rest}
      />
    );
  }
}
