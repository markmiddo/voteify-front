import I from 'immutable';
import { signInAction, logOutAction } from 'domain/env';
import {
  updateProfileAction,
  getProfileContentAction,
  changeProfileContentOrderAction,
  getPatronQuestionsAction,
  createAnswerAction,
  omniauthAction,
  omniauthUpdateAction,
} from 'domain/env/actions';

const initialState = I.fromJS({
  tokens: null,
  instance: {},
  profile: {
    order: 'start_date',
    resources: [],
    loading: true,
  },
  isAuthorized: false,
  questions: [],
});

export const reducer = {
  env(state = initialState, { type, payload }) {
    switch (type) {
      case omniauthAction.success:
      case signInAction.success:
        return state
          .set('instance', payload.get('instance'))
          .set('tokens', payload.get('tokens'))
          .set('isAuthorized', true);

      case omniauthUpdateAction.success:
      case updateProfileAction.success:
        return state
          .set('instance', payload);

      case logOutAction.type:
        return state
          .set('isAuthorized', false);

      case logOutAction.success:
        return initialState;

      case getProfileContentAction.type:
        return state
          .setIn(['profile', 'loading'], true)
          .setIn(['profile', 'resources'], I.List());

      case getProfileContentAction.success:
        return state
          .setIn(['profile', 'loading'], false)
          .setIn(['profile', 'resources'], payload.get('resources'));

      case getProfileContentAction.failure:
        return state
          .setIn(['profile', 'loading'], false);

      case getPatronQuestionsAction.success:
        return state
          .set('questions', payload.get('resources'));

      case createAnswerAction.success:
        return state
          .set('questions', state.get('questions').filter(item => item.get('id') !== payload.getIn(['resource', 'question_id'])));

      case changeProfileContentOrderAction.type:
        return state.setIn(['profile', 'order'], payload.params.order);

      default:
        return state;
    }
  },
};
