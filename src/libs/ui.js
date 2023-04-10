import normalizeUrl from 'normalize-url';

export const normalizeURL = (url, options) => (url ? normalizeUrl(url, options) : '');
