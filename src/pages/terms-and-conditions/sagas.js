import {
  takeLatest, fork,
} from 'redux-saga/effects';
import {
  ensureGetTermsPage,
} from '../../domain/terms';
import { getTermsAction } from '../../domain/terms/actions';

function* watchGetTermsPage() {
  yield fork(ensureGetTermsPage);
}

export default function* () {
  yield takeLatest(getTermsAction.type, watchGetTermsPage);
}
