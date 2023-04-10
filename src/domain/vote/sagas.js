import Api from 'domain/api';
import {
  addSongAction, createVoteAction, getVoteAction, editVoteAction, shareVoteAction,
} from 'domain/vote/actions';
import { voteIdSelector } from 'domain/vote/selectors';
import I from 'immutable';
import ensure from 'libs/ensureSaga';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { fork, select, takeLatest } from 'redux-saga/effects';

export const ensureCreateVote = ensure({
  api: Api.createVote,
  action: createVoteAction,
  responseSerializer: d => I.fromJS(d.resource),
  onFailure: err => toast.error(err.toString() || 'Smth went wrong...'),
});

export const ensureEditVote = ensure({
  api: Api.editVote,
  action: editVoteAction,
  responseSerializer: d => I.fromJS(d.resource),
  onFailure: err => toast.error(err.toString() || 'Smth went wrong...'),
});

export const ensureAddSong = ensure({
  api: Api.addSong,
  action: addSongAction,
  responseSerializer: d => I.fromJS(d.resource),
  onSuccess: () => toast.success('Song Successfully Added'),
  onFailure: (err) => {
    if (get(err, 'response.status') !== 422) {
      toast.error(err.message || 'Smth went wrong...');
    }
  },
});

export const ensureGetVote = ensure({
  api: Api.getVote,
  action: getVoteAction,
  responseSerializer: d => I.fromJS(d.resource),
});

function* watchVotes({ payload }) {
  const currentId = yield select(voteIdSelector);
  if (currentId !== payload) {
    yield fork(ensureGetVote, { id: payload });
  }
}

export default function* () {
  yield takeLatest(getVoteAction.type, watchVotes);
}
