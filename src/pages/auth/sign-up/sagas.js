import { Router } from 'routes';
import { toast } from 'react-toastify';
import I from 'immutable';
import get from 'lodash/get';
import {
  takeLatest, fork, take, takeEvery, put, call,
} from 'redux-saga/effects';
import Api from 'domain/api';
import {
  signUpAction,
  signInAction,
} from 'domain/env/index';
import {
  getTokens,
} from 'domain/env/sagas';
import { checkGuestActionsAfterAuth } from 'domain/guest';
import { asyncErrorAction } from 'libs/asyncErrorAction';
import { setUserToLocalStorage } from 'pages/auth/sign-in/sagas';


export function* watchSignUp({ payload }) {
  try {
    const response = yield call(Api.signUp, { data: payload });
    yield put({
      type: signUpAction.success,
      payload: I.fromJS(response.data),
    });

    const user = I.fromJS({
      instance: response.data.resource,
      tokens: getTokens(response.headers),
      expiry: response.headers.expiry,
    });

    yield put({
      type: signInAction.success,
      payload: user,
    });

    yield fork(setUserToLocalStorage, user);

    const guestActionsResult = yield call(checkGuestActionsAfterAuth);

    if (!guestActionsResult) {
      yield Router.pushRoute('/profile');
    }
  } catch (err) {
    if (get(err, 'response.status') !== 422) {
      toast.error(err.message || 'Smth went wrong...');
    }

    const formErrors = get(err, 'response.data.errors');

    if (formErrors) {
      yield put(asyncErrorAction('signUpForm', formErrors));
    }

    yield put({
      type: signUpAction.failure,
      err,
    });
  }
}

export default function* () {
  yield takeLatest(signUpAction.type, watchSignUp);
}
