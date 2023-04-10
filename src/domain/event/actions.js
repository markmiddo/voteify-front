import { asyncAction } from 'libs/actions';

export const getEventAction = asyncAction('EVENT/GET_EVENT');
export const deleteSongAction = asyncAction('EVENT/DELETE_SONG', params => params);
export const getAllEventsAction = asyncAction('EVENT/GET_ALL');
export const getSomeEventsAction = asyncAction('EVENT/GET_SOME');
