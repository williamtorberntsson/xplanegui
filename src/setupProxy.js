const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(createProxyMiddleware('/plane', {
      target: 'http://localhost:5050',
      }));
    
    app.use(createProxyMiddleware('/env', {
    target: 'http://localhost:5050',
    }));
  };