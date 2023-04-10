import AuthenticationService from 'services/AuthenticationService';
import { ensureSignIn, signInAction, submitErrorToForm } from 'domain/env/index';
import { checkGuestActionsAfterAuth } from 'domain/guest/sagas';
import { Router } from 'routes';
import {
  takeLatest, fork, take, takeEvery, call,
} from 'redux-saga/effects';

// to cookie, not localStorage
export function* setUserToLocalStorage(user) {
  const expiryTime = Date.now() + Number(user.get('expiry'));
  const expiry = new Date(expiryTime);
  yield AuthenticationService.setTokens(user.get('tokens'), expiry);
  yield AuthenticationService.setUser(user, expiry);
}

function* watchSignIn({ payload }) {
  yield fork(ensureSignIn, { data: payload });
  yield takeEvery(signInAction.failure, submitErrorToForm('signIn'));
  const { payload: user } = yield take(signInAction.success);
  yield fork(setUserToLocalStorage, user);

  const guestActionsResult = yield call(checkGuestActionsAfterAuth);

  if (!guestActionsResult) {
    yield Router.pushRoute('profile');
  }
}

export default function* () {
  yield takeLatest(signInAction.type, watchSignIn);
}
