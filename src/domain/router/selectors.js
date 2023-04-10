import { peek, raw, selector } from 'libs/selectors';

export const routePathSelector = selector(peek('router', 'path'), raw);
export const routerNotFoundSelector = selector(peek('router', 'notFound'), raw);
