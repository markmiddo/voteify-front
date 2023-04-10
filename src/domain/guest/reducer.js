import I from 'immutable';
import * as A from 'domain/guest/actions';
import { signInAction } from 'domain/env';

const initialState = I.fromJS({
  voteData: {},
  authModal: {
    isOpen: false,
  },
});

export const reducer = {
  guest(state = initialState, { type, payload }) {
    switch (type) {
      case A.guestSetVoteDataAction.type:
        return state
          .set('voteData', payload);
      case A.guestResetVoteDataAction.type:
        return state
          .set('voteData', new I.Map());

      // ///////////////////
      case A.guestAuthModalOpenAction.type:
        return state
          .setIn(['authModal', 'isOpen'], true);
      case A.guestAuthModalCloseAction.type:
      case signInAction.success:
        return state
          .setIn(['authModal', 'isOpen'], false);

      default:
        return state;
    }
  },
};
