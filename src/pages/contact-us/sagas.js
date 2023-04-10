import { ensureSendContactUs } from 'domain/env/index';
import { contactUsAction } from 'domain/env/actions';
import { takeLatest, fork } from 'redux-saga/effects';

function* watchSendContactUs({ payload }) {
  yield fork(ensureSendContactUs, { data: { resource: payload } });
}

export default function* () {
  yield takeLatest(contactUsAction.type, watchSendContactUs);
}
