import React from 'react';
import PropTypes from 'prop-types';

import BEM from 'services/bem';
import fetch from 'services/fetch';

import './index.scss';

const bem = BEM('hint-page');

const HOST = process.env.NODE_ENV === 'production' ? process.env.API_HOST : '';

@fetch(
  async ({ location }) => window
    .fetch(`${HOST}/api/v1/car-info/${location.query.search}`)
    .then(response => response.json()),
  {
    filter: ({ location }) => Boolean(location.query.search),
    loader: false,
  },
)
export default class HintPage extends React.PureComponent {
  static displayName = 'HintPage';

  static propTypes = {
    fetch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    result: PropTypes.shape({
      owner: PropTypes.string,
      year: PropTypes.number,
      crashesCount: PropTypes.number,
      ownersCount: PropTypes.number,
    }).isRequired,
    location: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { location, fetch: fetchOnUpdate } = this.props;
    const { location: oldLocation } = prevProps;

    if (location.query.search !== oldLocation.query.search) {
      fetchOnUpdate();
    }
  }

  render() {
    const { loading, result } = this.props;

    return (
      <table className={bem()}>
        <caption className={bem('caption')}>Search result</caption>

        <thead className={bem('head')}>
          <tr>
            <th>owner</th>
            <th>year</th>
            <th>crashesCount</th>
            <th>ownersCount</th>
          </tr>
        </thead>

        <tbody className={bem('body', { loading })}>
          <tr>
            {result ? Object.entries(result).map(([field, value]) => (
              <td key={field}><span>{value}</span></td>
            )) : (
              <td colSpan={4}><span>try to search cars</span></td>
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}
