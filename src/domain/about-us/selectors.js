import { peek, raw, selector } from 'libs/selectors';

export const aboutUsSelector = selector(peek('aboutUs', 'resources'), raw);
