import { peek, raw, selector } from 'libs/selectors';

export const eventSelector = selector(peek('event', 'resource'), raw);

export const eventsSelector = selector(peek('event', 'resources'), raw);
export const eventsMetaSelector = selector(peek('event', 'meta'), raw);

export const eventLoadingSelector = selector(peek('event', 'loading'), raw);
export const eventIdSelector = selector(peek('event', 'resource', 'id'), raw);
