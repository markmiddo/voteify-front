import { forgotPasswordAction } from 'domain/env/index';
import { fromJS } from 'immutable';
import { peek, raw, selector } from 'libs/selectors';

export const initialState = fromJS({
  page: 'form',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case forgotPasswordAction.success:
      return state.set('page', 'success');
    default:
      return state;
  }
}

export const pageStatusSelector = selector(peek('forgot', 'page'), raw);
