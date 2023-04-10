import { ensureForgotPassword, forgotPasswordAction, submitErrorToForm } from 'domain/env/index';
import { takeLatest, takeEvery } from 'redux-saga/effects';

export default function* () {
  yield takeLatest(forgotPasswordAction.type, ensureForgotPassword);
  yield takeEvery(forgotPasswordAction.failure, submitErrorToForm('forgot'));
}
