import {
  ensureSetStatistic, envInstanceSelector, envIsAuthorized, setStatisticAction,
} from 'domain/env';
import {
  takeLatest, fork, select,
} from 'redux-saga/effects';
import AuthenticationService from 'services/AuthenticationService';

function* watchSetStatistic({ payload }) {
  const uid = yield AuthenticationService.setUid();
  const isAuthorized = yield select(envIsAuthorized);
  const user = yield select(envInstanceSelector);
  const resource = { event_id: payload.event_id, page: 'show_page' };
  if (isAuthorized) resource.patron_id = user.get('id');
  else resource.visitor_uid = uid;
  yield fork(ensureSetStatistic, { data: { resource } });
}

export default function* () {
  yield takeLatest(setStatisticAction.type, watchSetStatistic);
}
