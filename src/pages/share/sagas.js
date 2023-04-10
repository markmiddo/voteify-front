import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
// import { ensureShareVote } from 'domain/vote/sagas';
import Api from 'domain/api';
import { shareVoteAction } from 'domain/vote/actions';
import I from 'immutable';


function* watchUpdateVote({ payload }) {
  const { data, resolve, reject } = payload;
  const { resource } = data;

  try {
    const response = yield call(Api.editVote, { id: data.id, data: { resource } });

    if (response) {
      yield put({ type: shareVoteAction.success, payload: I.fromJS(response.data.resource) });
    }

    if (typeof resolve === 'function') {
      resolve();
    }
  } catch (e) {
    if (typeof reject === 'function') {
      reject();
    }
  }
}

export default function* () {
  yield takeLatest(shareVoteAction.type, watchUpdateVote);
}
