/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import App, { Container } from 'next/app';
import { compose } from 'redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { connect, Provider } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ToastContainer } from 'react-toastify';
import NProgress from 'nprogress';

import { setupInterceptors } from 'libs/http';
import AuthorizationService from 'services/AuthorizationService';
import AuthenticationService from 'services/AuthenticationService';
import { routerNotFoundSelector, routeChangeAction } from 'domain/router';
import { guestAuthModalIsOpenSelector } from 'domain/guest/selectors';
import { guestAuthModalCloseAction } from 'domain/guest/actions';
import configureStore from 'domain/configureStore';

import Layout from 'layout';
import AuthModal from 'pages/auth/modal';
import Error from 'pages/_error';

// tmp fix for https://github.com/zeit/next-plugins/issues/282

import Router from 'next/router';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
    const timestamp = new Date().valueOf();
    els[0].href = `/_next/static/css/styles.chunk.css?v=${timestamp}`;
  }
});
// end fix

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    /* setup interceptors for requests on server side */
    setupInterceptors(ctx.store);
    /* dispatch login action if not authorized in store but have token in cookie */
    AuthenticationService.authorizeFromCookie(ctx);

    /* check current route and redirect with policy */
    const foundRoute = AuthorizationService.check(ctx);

    ctx.store.dispatch(routeChangeAction(ctx.pathname));

    /* get initial props for current page component */
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps, foundRoute };
  }

  componentDidMount() {
    /* setup interceptors for requests on client side */
    // window.fbAsyncInit = () => {
    //   FB.init({
    //     appId: process.env.FB_APP_ID,
    //     autoLogAppEvents: true,
    //     xfbml: true,
    //     version: 'v3.2',
    //   });
    // };

    // (((d, s, id) => {
    //   let js = d.getElementsByTagName(s)[0];
    //   const fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = '//connect.facebook.net/en_US/sdk.js';
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, 'script', 'facebook-jssdk'));

    setupInterceptors(this.props.store);
  }

  render() {
    const {
      Component,
      pageProps,
      store: createdStore,
      foundRoute,
      notFound,
      guestAuthModalIsOpen,
      guestAuthModalClose,
    } = this.props;

    return (
      <Container>
        <Provider store={createdStore}>
          <Layout>
            {!foundRoute || notFound
              ? <Error statusCode={404} />
              : <Component {...pageProps} />
            }

            {guestAuthModalIsOpen && (
              <AuthModal
                cancel={guestAuthModalClose}
              />
            )}
          </Layout>
        </Provider>
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default compose(
  withRedux(configureStore),
  withReduxSaga({ async: true }),
  connect(createStructuredSelector({
    notFound: routerNotFoundSelector,
    guestAuthModalIsOpen: guestAuthModalIsOpenSelector,
  }), { routeChange: routeChangeAction, guestAuthModalClose: guestAuthModalCloseAction }),
)(MyApp);
