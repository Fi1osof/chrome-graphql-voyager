var proxy = require('http-proxy-middleware');
var cwd = process.cwd();

module.exports = function (app) {

  app.use("/public", function (req, res, next) {

    const {
      originalUrl,
    } = req;

    res.sendFile(cwd + originalUrl);

  });

  app.use(proxy('/services/graphql', {
    target: 'http://localhost:4080',
    ws: true,
  }));

};
