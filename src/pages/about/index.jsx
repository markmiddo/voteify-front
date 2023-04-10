import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Page from 'components/GenericAboutPage';
import {
  aboutUsSelector,
} from '../../domain/about-us/selectors';
import {
  getAboutUsAction,
} from '../../domain/about-us/actions';


class AboutPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    ctx.store.dispatch(getAboutUsAction());
  }

  render() {
    const { data } = this.props;

    return (
      <Page>
        <Page.Header>
            About us
        </Page.Header>
        <Page.Content>
          <div className="row">
            {data.size && (
              data.map(d => (
                <div key={d.get('id')} className="col-sm-6">
                  <p className="title">{d.get('subtitle')}</p>
                  <p className="text">{d.get('body')}</p>
                </div>
              ))
            )}
          </div>
        </Page.Content>
      </Page>
    );
  }
}

AboutPage.propTypes = {
  data: PropTypes.instanceOf(I.Map),
};

export default compose(
  connect(createStructuredSelector({
    data: aboutUsSelector,
  })),
)(AboutPage);
