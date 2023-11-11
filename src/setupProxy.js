import { createProxyMiddleware } from 'http-proxy-middleware';
const proxy = {
    target: 'https://api.musixmatch.com/',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/search',
    createProxyMiddleware(proxy)
  );
};