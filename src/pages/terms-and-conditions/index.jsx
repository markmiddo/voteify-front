import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Page from 'components/GenericAboutPage';
import {
  termsSelector,
  getTermsAction,
} from '../../domain/terms';


class TermsPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    ctx.store.dispatch(getTermsAction());
  }

  render() {
    const { data } = this.props;

    return (
      <Page>
        <Page.Header>
                    Terms and conditions
        </Page.Header>
        <Page.Content>
          <p className="title text-pre-wrap">{data.get('title')}</p>
          <p className="text text-pre-wrap">{data.get('body')}</p>
        </Page.Content>
      </Page>
    );
  }
}

TermsPage.propTypes = {
  data: PropTypes.instanceOf(I.Map).isRequired,
};

export default compose(
  connect(createStructuredSelector({
    data: termsSelector,
  })),
)(TermsPage);
