import { guestGetVoteDataSelector } from 'domain/guest/selectors';
import * as A from 'domain/guest/actions';
import { getVoteAction } from 'domain/vote/actions';
import { guestCreateVote } from 'pages/vote/sagas';
import {
  select,
  call,
  put,
} from 'redux-saga/effects';
import { Router } from 'routes';

export function* checkGuestActionsAfterAuth() {
  const guestVoteData = yield select(guestGetVoteDataSelector);
  let guestActionsResult = false;

  if (guestVoteData.size > 0) {
    try {
      const vote = yield call(guestCreateVote, guestVoteData.toJS());
      yield put({
        type: A.guestResetVoteDataAction.type,
      });
      guestActionsResult = true;

      if (vote.size > 0) {
        yield Router.pushRoute('share', { id: vote.get('id') });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return guestActionsResult;
}
