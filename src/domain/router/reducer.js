import { routeChangeAction, makeNotFoundErrorAction } from 'domain/router/actions';
import { getEventAction } from 'domain/event/actions';
import I from 'immutable';

const initialState = I.fromJS({
  path: '/',
  notFound: false,
});

export const reducer = {
  router(state = initialState, { type, payload }) {
    switch (type) {
      case routeChangeAction.type:
        return state
          .set('path', payload)
          .set('notFound', false);

      case getEventAction.failure:
      case makeNotFoundErrorAction.type:
        return state.set('notFound', true);

      default:
        return state;
    }
  },
};
