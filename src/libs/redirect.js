import { Router } from 'routes';

export const redirect = (target, ctx = {}) => {
  if (ctx.res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    // On the browser, next/router is used to "replace" the current
    // location for the new one, removing it from history.
    Router.replaceRoute(target);
  }
};

export const redirectTo404 = (ctx = {}) => {
  if (ctx.res) {
    ctx.res.statusCode = 404;
    ctx.res.end('Not found');
  }
  return false;
};
