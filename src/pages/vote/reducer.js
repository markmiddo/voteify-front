import { addSongAction } from 'domain/vote';
import { fromJS } from 'immutable';
import { syncAction } from 'libs/actions';
import { peek, raw, selector } from 'libs/selectors';

export const openAddSongPopupAction = syncAction('VOTE/OPEN_ADD_SONG_POPUP');
export const closeAddSongPopupAction = syncAction('VOTE/CLOSE_ADD_SONG_POPUP');

export const initialState = fromJS({
  addSongPopupIsOpen: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case openAddSongPopupAction.type:
      return state.set('addSongPopupIsOpen', true);
    case addSongAction.success:
    case closeAddSongPopupAction.type:
      return state.set('addSongPopupIsOpen', false);
    default:
      return state;
  }
}

export const addSongPopupStatusSelector = selector(peek('vote-page', 'addSongPopupIsOpen'), raw);
