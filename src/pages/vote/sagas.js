import Api from 'domain/api';
import { ensureCreateVote, ensureAddSong, ensureEditVote } from 'domain/vote/sagas';
import { createVoteAction, addSongAction, editVoteAction } from 'domain/vote/actions';
import { asyncErrorAction } from 'libs/asyncErrorAction';
import { getEventVoteAction } from 'domain/vote';
import { getEventWithVote } from 'domain/event';
import serializer from 'pages/vote/serializer';
import {
  fork, put, take, takeEvery, takeLatest, call,
} from 'redux-saga/effects';
import { Router } from 'routes';
import get from 'lodash/get';
import I from 'immutable';
import { toast } from 'react-toastify';

function* handleFormError({ err }) {
  const formErrors = get(err, 'response.data.errors.track');
  if (formErrors) {
    yield put(asyncErrorAction('addSong', 'Song is already in list'));
  } else {
    yield put(asyncErrorAction('addSong', get(err, 'response.data.errors')));
  }
}

function* watchCreateVote({ payload }) {
  yield fork(ensureCreateVote, serializer(payload));
  const { payload: vote } = yield take(createVoteAction.success);
  yield Router.pushRoute('share', { id: vote.get('id') });
}

export function* guestCreateVote(data) {
  let vote = new I.Map();

  try {
    const response = yield call(Api.createVote, serializer(data));
    vote = I.fromJS(response.data.resource);

    yield put({
      type: createVoteAction.success,
      payload: vote,
    });
  } catch (error) {
    const err = get(error, 'response.data.errors');
    if (err) {
      yield put({
        type: createVoteAction.failure,
        err,
      });
    }

    yield toast.error(err || 'Error');
  }

  return vote;
}

function* watchEditVote({ payload }) {
  yield fork(ensureEditVote, { id: payload.id, ...serializer(payload) });
  yield Router.pushRoute('share', { id: payload.id });
}

function* watchAddSong({ payload }) {
  yield fork(ensureAddSong, { data: { resource: payload } });
  yield takeEvery(addSongAction.failure, handleFormError);
}

function* watchGetEventWithVote({ payload }) {
  yield fork(getEventWithVote, { payload });
}

export default function* () {
  yield takeLatest(createVoteAction.type, watchCreateVote);
  yield takeLatest(editVoteAction.type, watchEditVote);
  yield takeLatest(addSongAction.type, watchAddSong);
  yield takeLatest(getEventVoteAction.type, watchGetEventWithVote);
}
