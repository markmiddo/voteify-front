import {
  getEventAction,
  deleteSongAction, getAllEventsAction, getSomeEventsAction,
} from 'domain/event/actions';
import { eventIdSelector } from 'domain/event/selectors';
import { makeNotFoundErrorAction } from 'domain/router/actions';
// import { routePathSelector } from 'domain/router/selectors';
import I from 'immutable';
import Api from 'domain/api';
import ensure from 'libs/ensureSaga';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import {
  takeLatest, fork, select, call, put,
} from 'redux-saga/effects';

import { getVoteAction, getEventVoteAction } from '../vote';
import moment from 'moment';

export const ensureDeleteSong = ensure({
  api: Api.deleteSong,
  action: deleteSongAction,
  responseSerializer: d => I.fromJS(d.resource),
});

const eventSerializer = ({ resource }) => {
  const startDate = +new Date(resource.start_date);
  const dateNow = Date.now();
  const day = 60 * 60 * 24 * 1000;
  // eslint-disable-next-line no-param-reassign
  resource.expires = (startDate - dateNow) < day; // TODO: deprecated
  resource.isDisabledVoting = moment().isAfter(resource.vote_end_date);

  // reverse sort event_tracks
  resource.event_tracks = resource.event_tracks.sort((a, b) => {
    let x = a.track.author.toLowerCase();
    let y = b.track.author.toLowerCase();
    if (x > y) {return 1;}
    if (x < y) {return -1;}
    return 0;
  });

  return I.fromJS(resource);
};

export function* ensureGetEvent(args) {
  try {
    const { data } = yield call(Api.getEvent, args);
    const event = eventSerializer(data);
    yield put({
      type: getEventAction.success,
      payload: event,
    });
  } catch (err) {
    yield put({
      type: getEventAction.failure,
      err,
    });
    toast.error(err.toString() || 'Smth went wrong...');
  }
}

function* watchEvent({ payload }) {
  const currentId = yield select(eventIdSelector);
  if (currentId !== payload) {
    yield fork(ensureGetEvent, { id: payload });
  }
}

export const ensureGetEvents = ({ payload, type }) => ensure({
  api: Api.getEvents,
  action: type === 'EVENT/GET_ALL' ? getAllEventsAction : getSomeEventsAction,
  responseSerializer: d => I.fromJS(d),
  onFailure: (err) => {
    if (get(err, 'response.status') !== 422) {
      toast.error(err.message || 'Smth went wrong...');
    }
  },
})({ query: payload });


export function* getEventWithVote({ payload }) {
  try {
    const { data } = yield call(Api.getEvent, { id: payload });
    const event = eventSerializer(data);

    if (event.get('isDisabledVoting')) {
      yield put({
        type: makeNotFoundErrorAction.type,
      });
    }
    const voteId = event.getIn(['vote', 'id']);

    if (voteId !== undefined) {
      try {
        const { data: { resource } } = yield call(Api.getVote, { id: voteId });
        const voteData = I.fromJS(resource);

        yield put({
          type: getVoteAction.success,
          payload: voteData,
        });
      } catch (voteErr) {
        yield put({
          type: getVoteAction.failure,
          err: voteErr,
        });
      }
    }
    yield put({
      type: getEventAction.success,
      payload: event,
    });
    yield put({
      type: getEventVoteAction.success,
    });
  } catch (eventErr) {
    yield put({
      type: getEventAction.failure,
      err: eventErr,
    });
    toast.error(eventErr.toString() || 'Smth went wrong...');
  }
}

export default function* () {
  yield takeLatest(getSomeEventsAction.type, ensureGetEvents);
  yield takeLatest(getAllEventsAction.type, ensureGetEvents);
  yield takeLatest(getEventAction.type, watchEvent);
  yield takeLatest(deleteSongAction.type, ensureDeleteSong);
}
