import { resetPasswordAction } from 'domain/env/index';
import { fromJS } from 'immutable';
import { peek, raw, selector } from 'libs/selectors';

export const initialState = fromJS({
  page: 'form',
  message: 'Password reset successfully',
});

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case resetPasswordAction.success:
      return state
        .set('page', 'success')
        .set('message', payload.message);
    default:
      return state;
  }
}

export const pageStatusSelector = selector(peek('reset', 'page'), raw);
export const pageMessageSelector = selector(peek('reset', 'message'), raw);
