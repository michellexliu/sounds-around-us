const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target: "http://localhost:3001",
    })
  );
  app.use(
    "/submit",
    createProxyMiddleware({
      target: "http://localhost:3001",
    })
  );
  app.use(
    "/posts",
    createProxyMiddleware({
      target: "http://localhost:3001",
    })
  );
};
