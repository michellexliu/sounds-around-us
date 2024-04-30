const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://localhost:3001';

module.exports = function (app) {
  app.use(
    '/auth/**',
    createProxyMiddleware({
      target,
    })
  );
  app.use(
    '/submit',
    createProxyMiddleware({
      target,
    })
  );
  app.use(
    '/posts',
    createProxyMiddleware({
      target,
    })
  );
  app.use(
    '/post',
    createProxyMiddleware({
      target,
    })
  );
};
