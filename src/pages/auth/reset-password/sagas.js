import { ensureResetPassword, resetPasswordAction, submitErrorToForm } from 'domain/env/index';
import {
  takeLatest, fork, takeEvery,
} from 'redux-saga/effects';

function* watchResetPassword({ payload }) {
  const query = payload.get('query');
  const headers = {
    'access-token': query.get('token'),
    client: query.get('client_id'),
    uid: query.get('uid'),
    expiry: query.get('expiry'),
  };
  yield fork(ensureResetPassword, { data: payload, headers });
  yield takeEvery(resetPasswordAction.failure, submitErrorToForm('reset'));
}

export default function* () {
  yield takeLatest(resetPasswordAction.type, watchResetPassword);
}
