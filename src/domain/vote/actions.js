import { asyncAction, syncAction } from 'libs/actions';

export const createVoteAction = asyncAction('VOTE/CREATE');
export const editVoteAction = asyncAction('VOTE/EDIT');
export const addSongAction = asyncAction('VOTE/ADD_SONG');
export const getVoteAction = asyncAction('VOTE/GET_VOTE');
export const getEventVoteAction = asyncAction('VOTE/GET_EVENT_VOTE');
export const clearVoteAction = syncAction('VOTE/CLEAR');
export const shareVoteAction = asyncAction('VOTE/SHARE');
