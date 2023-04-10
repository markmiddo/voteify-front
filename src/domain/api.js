import http from 'libs/http';

/**
 * Function helper returned function that return promise;
 * @param method {string} api method (get, put, post, etc...)
 * @param url {string|function} url to api method
 * */
function api(method, url) {
  return args => http({
    method,
    url: typeof url === 'function' ? url(args) : url,
    ...args,
  });
}

export default {
  signUp: api('post', '/api/auth'),
  signIn: api('post', 'api/auth/sign_in'),
  forgotPassword: api('post', '/api/auth/password'),
  resetPassword: api('put', '/api/auth/password'),
  getProfile: api('get', params => `/api/users/${params.id}`),
  updateProfile: api('put', params => `/api/users/${params.id}`),
  getEvent: api('get', params => `/api/events/${params.id}`),
  setStatistic: api('post', '/api/view_events'),
  createVote: api('post', '/api/patron/votes'),
  editVote: api('put', params => `/api/patron/votes/${params.id}`),
  addSong: api('post', '/api/event_tracks'),
  deleteSong: api('delete', params => `/api/event_tracks/${params.id}`),
  getPatronVotes: api('get', '/api/patron/votes'),
  getVote: api('get', params => `/api/patron/votes/${params.id}`),
  getEvents: api('get', url => `/api/events?${url.query}`),
  getQuestions: api('get', url => '/api/patron/questions'),
  contactUs: api('post', '/api/visitor_messages'),
  createAnswer: api('post', '/api/answers'),
  getAboutPage: api('get', '/api/about_us_details'),
  getTermsPage: api('get', '/api/terms_and_conditions'),
};
