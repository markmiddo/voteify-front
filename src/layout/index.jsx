import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from 'layout/header';
import Footer from 'layout/footer';
import Head from 'next/head';

import './style.css';
import 'theme/root.scss';

import cx from 'classnames';
import styles from './styles.scss';

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;
    return (
      <div id="layout">
        <Head>
          <title>Voteify</title>
        </Head>
        <Header />
        <div className={cx(styles.content, 'layout-body')}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
