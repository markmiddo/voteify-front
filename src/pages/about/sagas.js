import {
  takeLatest, fork,
} from 'redux-saga/effects';
import { getAboutUsAction } from '../../domain/about-us/actions';
import {
  ensureGetAboutPage,
} from '../../domain/about-us/sagas';

function* watchGetAboutPage() {
  yield fork(ensureGetAboutPage);
}

export default function* () {
  yield takeLatest(getAboutUsAction.type, watchGetAboutPage);
}
