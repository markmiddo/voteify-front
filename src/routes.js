const routes = require('next-routes');

module.exports = routes()
  .add('index', '/', 'auth/sign-in')
  .add('profile')
  .add('/reset-password', 'auth/reset-password')
  .add('/forgot-password', 'auth/forgot-password')
  .add('/sign-in', 'auth/sign-in')
  .add('/sign-up', 'auth/sign-up')
  .add('/omniauth', 'auth/omniauth')
  .add('event/create')
  .add('event', '/event/:id')
  .add('event/edit', '/event/:id/edit')
  .add('vote', '/vote/:id')
  .add('share', '/share/:id')
  .add('stats', '/stats/:id')
  .add('dashboard')
  .add('events')
  .add('about')
  .add('terms-and-conditions')
  .add('contact-us');
