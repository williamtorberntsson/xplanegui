const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Create proxy for all routes
 * @param {*} app 
 */
module.exports = (app) => {
  app.use(createProxyMiddleware('/http-call', {
    target: 'http://localhost:5050',
    origin: true,
  }));
};