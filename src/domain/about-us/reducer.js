import I from 'immutable';
import {
  getAboutUsAction,
} from 'domain/about-us/actions';

const initialState = I.fromJS({
  resources: [],
});

export const reducer = {
  aboutUs(state = initialState, { type, payload }) {
    switch (type) {
      case getAboutUsAction.success:

        return state
          .set('resources', payload.get('resources'));

      default:
        return state;
    }
  },
};
