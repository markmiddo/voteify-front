import { syncAction } from 'libs/actions';

export const guestSetVoteDataAction = syncAction('GUEST/SET_VOTE_DATA');
export const guestGetVoteDataAction = syncAction('GUEST/GET_VOTE_DATA');
export const guestResetVoteDataAction = syncAction('GUEST/RESET_VOTE_DATA');
export const guestAuthModalOpenAction = syncAction('GUEST/AUTH_MODAL_OPEN');
export const guestAuthModalCloseAction = syncAction('GUEST/AUTH_MODAL_CLOSE');
