import Api from 'domain/api';
import { Router } from 'routes';
import { asyncErrorAction } from 'libs/asyncErrorAction';
import ensure from 'libs/ensureSaga';
import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import {
  signInAction, logOutAction, forgotPasswordAction, resetPasswordAction,
  updateProfileAction, setStatisticAction, getProfileContentAction, contactUsAction,
  createAnswerAction, omniauthAction, omniauthUpdateAction,
} from 'domain/env/actions';
import AuthenticationService from 'services/AuthenticationService';
import { getPatronQuestionsAction } from './actions';
import { toast } from 'react-toastify';
import I from 'immutable';

const TOKEN_KEYS = ['access-token', 'token-type', 'client', 'uid', 'expiry'];
export function getTokens(headers) {
  return TOKEN_KEYS.reduce((A, key) => ({ ...A, [key]: headers[key] }), {});
}

export function* ensureSignIn(args) {
  try {
    const response = yield call(Api.signIn, args);
    yield put({
      type: signInAction.success,
      payload: I.fromJS({
        instance: response.data.resource,
        tokens: getTokens(response.headers),
        expiry: response.headers.expiry,
      }),
    });
  } catch (err) {
    yield put({
      type: signInAction.failure,
      err,
    });
  }
}

export function* ensureOmniauth(args) {
  try {
    const response = yield call(Api.getProfile, args);
    yield put({
      type: omniauthAction.success,
      payload: I.fromJS({
        instance: response.data.resource,
        tokens: getTokens(response.headers),
        expiry: response.headers.expiry,
      }),
    });
  } catch (err) {
    yield put({
      type: omniauthAction.failure,
      err,
    });
  }
}

export const ensureOmniauthUpdate = ensure({
  api: Api.updateProfile,
  action: omniauthUpdateAction,
  responseSerializer: d => I.fromJS(d.resource),
});

export function* ensureLogOut() {
  yield AuthenticationService.signOut();
  yield Router.pushRoute('/sign-in');
  yield put({
    type: logOutAction.success,
  });
}

export const ensureForgotPassword = ensure({
  api: Api.forgotPassword,
  action: forgotPasswordAction,
});

export const ensureResetPassword = ensure({
  api: Api.resetPassword,
  action: resetPasswordAction,
});

export const ensureUpdateProfile = ensure({
  api: Api.updateProfile,
  action: updateProfileAction,
  responseSerializer: d => I.fromJS(d.resource),
  onSuccess: () => toast.success('Profile Updated Successfully.'),
  onFailure: err => toast.error(get(err, 'response.data.errors' || 'Smth went wrong...')),
});

export function submitErrorToForm(form, reject) {
  return function* handleFormError({ err }) {
    const formErrors = get(err, 'response.data.errors');

    if (typeof reject === 'function') {
      reject();
    }

    if (formErrors) {
      yield put(asyncErrorAction(form, formErrors));
    }
  };
}

export const ensureSetStatistic = ensure({
  api: Api.setStatistic,
  action: setStatisticAction,
});


export const ensureGetPatronVotes = ensure({
  api: Api.getPatronVotes,
  action: getProfileContentAction,
  responseSerializer: d => I.fromJS(d),
});

export const ensureSendContactUs = ensure({
  api: Api.contactUs,
  action: contactUsAction,
  onSuccess: () => toast.success('Message sent successfully.'),
  onFailure: (err) => {
    if (get(err, 'response.status') !== 422) {
      toast.error(err.message || 'Smth went wrong...');
    }
  },
});

export const ensureSendAnswer = ensure({
  api: Api.createAnswer,
  action: createAnswerAction,
  responseSerializer: d => I.fromJS(d),
});

export const ensureGetPatronQuestions = ensure({
  api: Api.getQuestions,
  action: getPatronQuestionsAction,
  responseSerializer: d => I.fromJS(d),
});
