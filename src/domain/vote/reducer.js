import {
  getVoteAction, createVoteAction, getEventVoteAction, clearVoteAction, shareVoteAction,
} from 'domain/vote/actions';
import I from 'immutable';

const initialState = I.fromJS({
  resources: [],
  resource: {},
  meta: {
    step: 1,
  },
  loading: true,
});

export const reducer = {
  vote(state = initialState, { type, payload }) {
    switch (type) {
      case getEventVoteAction.type:
      case getVoteAction.type:
        return state.set('loading', true);

      case getEventVoteAction.failure:
        return state.set('loading', false);

      case clearVoteAction.type:
        return initialState;

      case createVoteAction.success:
        return state.set('resource', payload);
      case shareVoteAction.success:
        return state.set('resource', payload);
      case getVoteAction.success:
        return state.set('resource', payload).set('loading', false);
      case getEventVoteAction.success:
        return state.setIn(['meta', 'step'], 2).set('loading', false);
      default:
        return state;
    }
  },
};
