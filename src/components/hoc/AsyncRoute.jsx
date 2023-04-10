import React, { PureComponent } from 'react';
import Types from 'prop-types';
import { Route } from 'react-router-dom';
import asyncComponent from './AsyncComponent';

export class AsyncRoute extends PureComponent {
  static propTypes = {
    render: Types.func.isRequired,
    path: Types.string,
    exact: Types.bool,
  }

  render() {
    const { path, render, exact = false } = this.props;
    return (
      <Route
        path={path}
        exact={exact}
        component={asyncComponent(render)}
      />
    );
  }
}
