const { createProxyMiddleware } = require("http-proxy-middleware");

const target = "https://sounds-around-us.herokuapp.com";

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target,
    })
  );
  app.use(
    "/submit",
    createProxyMiddleware({
      target,
    })
  );
  app.use(
    "/posts",
    createProxyMiddleware({
      target,
    })
  );
  app.use(
    "/post",
    createProxyMiddleware({
      target,
    })
  );
};
