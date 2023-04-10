import { peek, raw, selector } from 'libs/selectors';


export const termsSelector = selector(peek('terms', 'resource'), raw);
