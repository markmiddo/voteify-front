import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

/**
 * Combine all reducers in this file and export the combined reducers.
 */

import * as env from './env';
import * as event from './event';
import * as vote from './vote';
import * as router from './router';
import * as aboutUs from './about-us';
import * as terms from './terms';
import * as guest from './guest';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    form: formReducer,
    ...env.reducer,
    ...event.reducer,
    ...vote.reducer,
    ...router.reducer,
    ...aboutUs.reducer,
    ...terms.reducer,
    ...guest.reducer,
    ...injectedReducers,
  });
}
