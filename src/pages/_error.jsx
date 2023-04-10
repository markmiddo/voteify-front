import NotFound from 'components/ui/erros/NotFound';
/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';

export default class Error extends React.Component {
  static getInitialProps({ ctx, err }) {
    let statusCode = null;
    if (ctx.res) statusCode = ctx.res.statusCode;
    else if (err) statusCode = err.statusCode;
    // console.log('error', statusCode);
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    if (statusCode === 404) return <NotFound />;
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client ypc..'}
      </p>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};
