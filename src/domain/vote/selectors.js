import { peek, raw, selector } from 'libs/selectors';

export const voteSelector = selector(peek('vote', 'resource'), raw);
export const voteIdSelector = selector(peek('vote', 'resource', 'id'), raw);
export const voteLoadingSelector = selector(peek('vote', 'loading'), raw);
