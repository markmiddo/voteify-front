import axios from 'axios';
import { envTokenSelector, logOutAction } from 'domain/env';
import AuthenticationService from 'services/AuthenticationService';
import get from 'lodash/get';

export const BASE_URL = process.env.API_URL;

/** @type {AxiosInstance} */
const http = axios.create({
  baseURL: BASE_URL,
});

let interceptorRequestMiddlewareId = null;
let interceptorResponseMiddlewareId = null;

export function setupInterceptors(store, ctx) {
  // Remove previous request interceptor middleware
  if (!isNaN(interceptorRequestMiddlewareId)) {
    http.interceptors.request.eject(interceptorRequestMiddlewareId);
    interceptorRequestMiddlewareId = null;
  }

  // Remove previous response interceptor middleware
  if (!isNaN(interceptorResponseMiddlewareId)) {
    http.interceptors.response.eject(interceptorResponseMiddlewareId);
    interceptorResponseMiddlewareId = null;
  }

  interceptorRequestMiddlewareId = http.interceptors.request.use((config) => {
    const tokens = envTokenSelector(store.getState());
    // eslint-disable-next-line no-param-reassign
    if (tokens && tokens.size) config.headers = tokens.toJS();

    return config;
  });

  interceptorResponseMiddlewareId = http.interceptors.response.use(undefined, (error) => {
    if (get(error, 'response.status') === 401) {
      store.dispatch(logOutAction());
      AuthenticationService.signOut(ctx);
    }
    return Promise.reject(error);
  });
}

export default http;
