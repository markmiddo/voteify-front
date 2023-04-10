import { envIsAuthorized, envRoleSelector } from 'domain/env';
import {
  checkIfInAuthenticatedRoutes,
  checkIfInPatronRoutes,
  checkIfInPublicRoutes,
  checkIfInUnAuthenticated,
} from 'services/routes';
import { redirect } from 'libs/redirect';

export default class AuthorizationService {
  static check(ctx) {
    const state = ctx.store.getState();
    const isAuthenticated = envIsAuthorized(state);
    const userRole = envRoleSelector(state);
    if (checkIfInPublicRoutes(ctx.pathname)) return true;
    if (isAuthenticated) return AuthorizationService.checkAuthenticated(ctx, userRole);
    return AuthorizationService.checkUnAuthenticated(ctx);
  }

  static checkAuthenticated(ctx, userRole) {
    switch (userRole) {
      case 'Patron':
        return AuthorizationService.checkPatron(ctx);
      default:
        return false;
    }
  }

  static checkPatron(ctx) {
    if (checkIfInPatronRoutes(ctx.pathname)) return true;
    if (checkIfInUnAuthenticated(ctx.pathname)) redirect('profile', ctx);

    return false;
  }

  static checkUnAuthenticated(ctx) {
    if (checkIfInUnAuthenticated(ctx.pathname)) return true;
    if (checkIfInAuthenticatedRoutes(ctx.pathname)) redirect('/sign-in', ctx);
    return false;
  }
}
