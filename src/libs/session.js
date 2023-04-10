import cookie from 'js-cookie';

export const setCookie = (key, value, attr) => {
  if (process.browser) {
    cookie.set(key, value, attr);
  }
};

export const removeCookie = (key, ctx) => {
  if (process.browser) {
    return cookie.remove(key);
  }
  if (ctx.res) {
    return ctx.res.clearCookie(key);
  }
  return false;
};

const getCookieFromBrowser = key => cookie.get(key);

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const getCookie = (key, req) => (
  process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req)
);
