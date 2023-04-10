import { ensureLogOut, logOutAction } from 'domain/env';
import { all, fork, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import signUpSaga from 'pages/auth/sign-up/sagas';
import signInSaga from 'pages/auth/sign-in/sagas';
import omniauthSaga from 'pages/auth/omniauth/sagas';
import forgotPasswordSaga from 'pages/auth/forgot-password/sagas';
import resetPasswordSaga from 'pages/auth/reset-password/sagas';
import profileSaga from 'pages/profile/sagas';
import eventPageSaga from 'pages/event/sagas';
import eventsPageSaga from 'pages/events/sagas';
import votePageSaga from 'pages/vote/sagas';
import contactUsSaga from 'pages/contact-us/sagas';
import aboutSaga from 'pages/about/sagas';
import termsSaga from 'pages/terms-and-conditions/sagas';
import shareVoteSaga from 'pages/share/sagas';

import eventSaga from './event/sagas';
import voteSaga from './vote/sagas';

es6promise.polyfill();

function* rootSaga() {
  yield all([
    /* domain */
    fork(eventSaga),
    fork(voteSaga),

    /* pages */
    fork(signUpSaga),
    fork(signInSaga),
    fork(omniauthSaga),
    fork(forgotPasswordSaga),
    fork(resetPasswordSaga),
    fork(profileSaga),
    fork(eventPageSaga),
    fork(eventsPageSaga),
    fork(votePageSaga),
    fork(contactUsSaga),
    fork(aboutSaga),
    fork(termsSaga),
    fork(shareVoteSaga),

    /* global */
    takeLatest(logOutAction.type, ensureLogOut),
  ]);
}

export default rootSaga;
