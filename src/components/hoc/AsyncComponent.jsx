import React, { Component } from 'react';
import { makeCancelable } from 'libs/helpers';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    state = {
      component: null,
    }

    cancelable = null;

    componentWillMount() {
      this.cancelable = makeCancelable(
        importComponent(),
      );
      this.cancelable.promise
        .then(({ default: component }) => this.setState({ component }))
        .catch(err => console.info('Component is canceled\n', err));
    }

    componentWillUnmount() {
      this.cancelable.cancel();
    }

    render() {
      const { component: C } = this.state;
      return (C ? <C {...this.props} /> : null);
    }
  }
  return AsyncComponent;
}
