import {
  fork,
  takeLatest,
  take,
  select,
  call,
} from 'redux-saga/effects';
import { omniauthAction, omniauthUpdateAction } from 'domain/env/actions';
import { envTokenSelector, envInstanceSelector } from 'domain/env/selectors';
import { ensureOmniauth, ensureOmniauthUpdate } from 'domain/env/sagas';
import AuthenticationService from 'services/AuthenticationService';
import { Router } from 'routes';

function* setDataToStorage(originExpiry) {
  const tokens = yield select(envTokenSelector);
  const instance = yield select(envInstanceSelector);
  const user = { instance: instance.toJS(), tokens: tokens.toJS() };
  const currentExpiry = originExpiry || tokens.get('expiry');
  const newExpiry = Date.now() + Number(currentExpiry);
  const expiry = new Date(newExpiry);

  yield AuthenticationService.setTokens(user.tokens, expiry);
  yield AuthenticationService.setUser(user, expiry);
}

function* watchOmniauth({ payload }) {
  const { query, resolve, reject } = payload;
  const headers = {
    'access-token': query.auth_token,
    client: query.client_id,
    uid: query.uid,
    expiry: query.expiry,
  };

  yield fork(ensureOmniauth, { id: query.id, headers });
  const { payload: user } = yield take(omniauthAction.success);

  if (typeof resolve === 'function') {
    resolve();
  }
  if (user.size && user.getIn(['instance', 'type'])) {
    yield call(setDataToStorage, user.get('expiry'));
    yield Router.pushRoute('/profile');
  }
}
function* watchOmniauthUpdate({ payload }) {
  yield fork(ensureOmniauthUpdate, payload);
  yield take(omniauthUpdateAction.success);
  yield call(setDataToStorage);
  yield Router.pushRoute('/profile');
}

export default function* () {
  yield takeLatest(omniauthAction.type, watchOmniauth);
  yield takeLatest(omniauthUpdateAction.type, watchOmniauthUpdate);
}
