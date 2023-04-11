const express = require('express');
const next = require('next');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';
const app = next({ dev, dir: './src' });
const handler = routes.getRequestHandler(app);
const port = process.env.NODE_VOTEIFY_PORT || 3000;

app.prepare()
  .then(() => {
    express().use(handler).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
