const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Create proxy for all routes
 * @param {*} app 
 */
module.exports = (app) => {
  app.use(createProxyMiddleware('/plane', {
    target: 'http://localhost:5050',
  }));

  app.use(createProxyMiddleware('/env', {
    target: 'http://localhost:5050',
  })
  );

  app.use(createProxyMiddleware('/pfd', {
    target: 'http://localhost:5050',
  }));

  app.use(createProxyMiddleware('/weights', {
    target: 'http://localhost:5050',
  }));

  app.use(createProxyMiddleware('/env', {
    target: 'http://localhost:5050',
  }));
};