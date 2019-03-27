import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LayoutRoute from 'containers/layouts/LayoutRoute';
import CabinetLayout from 'containers/layouts/Cabinet';
import HintPage from 'containers/pages/Hint';

export default class Routes extends React.Component {
  static displayName = 'Routes';

  render() {
    return (
      <Switch>
        <LayoutRoute component={CabinetLayout}>
          <Route component={HintPage} />
        </LayoutRoute>
      </Switch>
    );
  }
}
