import { peek, raw, selector } from 'libs/selectors';

export const envTokenSelector = selector(peek('env', 'tokens'), raw);
export const envIsAuthorized = selector(peek('env', 'isAuthorized'), raw);
export const envInstanceSelector = selector(peek('env', 'instance'), raw);
export const envRoleSelector = selector(peek('env', 'instance', 'type'), raw);
export const envProfileContentSelector = selector(peek('env', 'profile', 'resources'), raw);
export const envProfileOrderContentSelector = selector(peek('env', 'profile', 'order'), raw);
export const envProfileLoadingSelector = selector(peek('env', 'profile', 'loading'), raw);
export const envPatronQuestionsSelector = selector(peek('env', 'questions'), raw);
