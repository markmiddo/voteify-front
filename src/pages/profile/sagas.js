import { toast } from 'react-toastify';
import AuthenticationService from 'services/AuthenticationService';
import {
  changeProfileContentOrderAction,
  ensureGetPatronVotes,
  ensureUpdateProfile,
  getProfileContentAction,
  updateProfileAction,
  ensureSendAnswer,
  ensureGetPatronQuestions,
  createAnswerAction,
  getPatronQuestionsAction,
} from 'domain/env';
import {
  takeLatest,
  fork,
  take,
  select,
} from 'redux-saga/effects';

function* updateProfileWatcher(action) {
  yield fork(ensureUpdateProfile, action);
  const { payload } = yield take(updateProfileAction.success);
  const rawUser = AuthenticationService.getUser();
  const user = rawUser && JSON.parse(rawUser);
  const expiryTime = Date.now() + Number(user.expiry);
  const expiry = new Date(expiryTime);
  user.instance = payload;
  yield AuthenticationService.setUser(user, expiry);
}

function* watchGetProfileContent({ payload }) {
  yield fork(ensureGetPatronVotes, payload);
}

function* watchSendAnswer({ payload }) {
  yield fork(ensureSendAnswer, { data: { resource: payload } });
  const data = yield take(createAnswerAction.success);
  if (data.payload.getIn(['resource', 'answer_value']) !== '') {
    toast.success('Answer sent successfully.');
  }
}

function* watchGetQuestions() {
  yield fork(ensureGetPatronQuestions);
}

export default function* () {
  yield takeLatest(updateProfileAction.type, updateProfileWatcher);
  yield takeLatest(
    [getProfileContentAction.type, changeProfileContentOrderAction.type],
    watchGetProfileContent,
  );
  yield takeLatest(getPatronQuestionsAction.type, watchGetQuestions);
  yield takeLatest(createAnswerAction.type, watchSendAnswer);
}
