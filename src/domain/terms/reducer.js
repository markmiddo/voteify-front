import I from 'immutable';
import {
  getTermsAction,
} from 'domain/terms/actions';

const initialState = I.fromJS({
  resource: {},
});

export const reducer = {
  terms(state = initialState, { type, payload }) {
    switch (type) {
      case getTermsAction.success:
        return state
          .set('resource', payload.get('resource'));

      default:
        return state;
    }
  },
};
