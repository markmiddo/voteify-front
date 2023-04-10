import { peek, raw, selector } from 'libs/selectors';

export const guestGetVoteDataSelector = selector(peek('guest', 'voteData'), raw);
export const guestAuthModalSelector = selector(peek('guest', 'authModal'), raw);
export const guestAuthModalIsOpenSelector = selector(peek('guest', 'authModal', 'isOpen'), raw);
