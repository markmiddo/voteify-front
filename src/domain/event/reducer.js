import {
  getEventAction,
  getAllEventsAction,
  getSomeEventsAction,
  deleteSongAction,
} from 'domain/event/actions';
import { addSongAction, getEventVoteAction } from 'domain/vote/actions';
import I from 'immutable';

const initialState = I.fromJS({
  resources: [],
  resource: {},
  stats: {},
  loading: false,
  someLoading: false,
});

export const reducer = {
  event(state = initialState, { type, payload }) {
    switch (type) {
      // Start loading
      case getAllEventsAction.type:
      case getEventAction.type:
      case getEventVoteAction.type:
        return state.set('loading', true);
      // Loading error
      case getAllEventsAction.failure:
      case getEventAction.failure:
        return state.set('loading', false);
      // Event item
      case getEventAction.success:
        return state.set('resource', payload).set('loading', false);
      // All events list
      case getAllEventsAction.success:
        return state
          .set('resources', payload.get('resources'))
          .set('meta', payload.get('meta'))
          .set('loading', false);
      // Some events list
      case getSomeEventsAction.type:
        return state.set('someLoading', true);
      case getSomeEventsAction.failure:
        return state.set('someLoading', false);
      case getSomeEventsAction.success:
        return state
          .set('resources', state.get('resources').push(...payload.get('resources')))
          .set('meta', payload.get('meta'))
          .set('someLoading', false);
      // -----
      case addSongAction.success:
        return state.updateIn(
          ['resource', 'event_tracks'],
          tracks => tracks
            .push(payload)
            .sort((firstTrack, secondTrack) => {
              const firstTrackSortValue = firstTrack.getIn(['track', 'author']);
              const secondTrackSortValue = secondTrack.getIn(['track', 'author']);

              if (firstTrackSortValue < secondTrackSortValue) return -1;
              if (firstTrackSortValue > secondTrackSortValue) return 1;

              return 0;
            }),
        );
      case deleteSongAction.success:
        return state.updateIn(
          ['stats', 'event_tracks'],
          tracks => tracks.filter(track => track.get('id') !== payload.get('id')),
        );
      default:
        return state;
    }
  },
};
