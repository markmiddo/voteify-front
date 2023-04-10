import { envIsAuthorized, signInAction } from 'domain/env/index';
import I from 'immutable';
import { getCookie, removeCookie, setCookie } from 'libs/session';
import uid from 'libs/uid';

export default class AuthenticationService {
  static tokenName = 'tokens';

  static getTokens(ctx = {}) {
    return getCookie(AuthenticationService.tokenName, ctx.req);
  }

  static setTokens(value, expires) {
    return setCookie(AuthenticationService.tokenName, value, { expires });
  }

  static setUser(value, expires) {
    return setCookie('user', value, { expires });
  }

  static getUser(ctx = {}) {
    return getCookie('user', ctx.req);
  }

  static isAuthenticated(ctx) {
    const rawTokens = AuthenticationService.getTokens(ctx);
    return rawTokens && Boolean(JSON.parse(AuthenticationService.decode(rawTokens)));
  }

  static signOut(ctx = {}) {
    removeCookie('tokens', ctx);
    removeCookie('user', ctx);
  }

  static decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }

  static authorizeFromCookie(ctx) {
    const isAuthorizedInStore = envIsAuthorized(ctx.store.getState());

    if (!isAuthorizedInStore) {
      /* get user from cookie */
      const rawUser = AuthenticationService.getUser(ctx);
      const user = rawUser && JSON.parse(AuthenticationService.decode(rawUser));

      /* setup user to redux */
      if (user) {
        ctx.store.dispatch({
          type: signInAction.success,
          payload: I.fromJS(user),
        });
      }
    }
  }

  static setUid() {
    const currentHash = getCookie('uid');

    if (!currentHash) {
      const hash = uid();
      setCookie('uid', hash, { expires: new Date('2040-12-31T23:59:59.000Z') });
      return hash;
    }
    return currentHash;
  }
}
