/* eslint-disable no-console */
require('dotenv').config({ path: '../.env' });

const express = require('express');
const addRequestId = require('express-request-id')();
const winston = require('winston');
const expressWinston = require('express-winston');
const next = require('next');
const health = require('@cloudnative/health-connect');
const fs = require('fs');
const https = require('https');

let cookie;

const proxyTarget = process.env.API_HOST || 'https://altatesting.avbportal.com';
const isHttps = process.env.PROTOCOL_TO_USE === 'https';

const devProxy = {
  '/api': {
    target: `${proxyTarget}/api/`,
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',

    onProxyReq: function relayRequestHeaders(proxyReq) {
      if (cookie) {
        proxyReq.setHeader('cookie', cookie);
      }
    },
    onProxyRes: function relayResponseHeaders(proxyRes) {
      var proxyCookie = proxyRes.headers['set-cookie'];
      if (proxyCookie) {
        cookie = proxyCookie;
      }
    },
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

// Health Checker
const healthCheck = new health.HealthChecker();

let appFunctioning = false;
const livePromise = () =>
  new Promise((resolve, reject) => {
    if (appFunctioning) {
      resolve();
    } else {
      reject(new Error('App is not ready'));
    }
  });

const liveCheck = new health.LivenessCheck('LivenessCheck', livePromise);
healthCheck.registerLivenessCheck(liveCheck);

const readyCheck = new health.ReadinessCheck('ReadinessCheck', livePromise);
healthCheck.registerReadinessCheck(readyCheck);

const handle = app.getRequestHandler();

// process.on('SIGINT', function () {
//   // close conections safely
// });

let server;
app
  .prepare()
  .then(() => {
    server = express();
    // Comment this line out if want to activate Brotli in dev mode
    if (!dev && process.env.ENABLE_BROTLI === 'true') {
      server.get('*.js', (req, res, next) => {
        if (
          req.header('Accept-Encoding').includes('br') &&
          !req._parsedUrl.pathname.endsWith('_ssgManifest.js')
        ) {
          // The if condition is to test in a local build dev mode.  In a local build,
          // chunks have query param timestamps attached.  So need to parse out the query,
          // add the `.br`, then add back the query param again to make Brotli work.
          if (dev && req.url.includes('/_next') && req.url.includes('?')) {
            const splitUrlStr = req.url.split('?');
            req.url = splitUrlStr[0] + '.br' + '?' + splitUrlStr[1];
          } else {
            req.url = req.url + '.br';
          }
          res.set('Content-Encoding', 'br');
          res.set('Content-Type', 'application/javascript');
        }
        next();
      });
      server.get('*.css', (req, res, next) => {
        if (req.header('Accept-Encoding').includes('br')) {
          req.url = req.url + '.br';
          res.set('Content-Encoding', 'br');
          res.set('Content-Type', 'text/css');
        }
        next();
      });
    }

    server.use(express.static('.next'));

    server.set('trust proxy', 1);
    server.use(addRequestId);
    server.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],

        format: winston.format.combine(
          winston.format.timestamp(),
          //winston.format.colorize(),
          winston.format.json(),
          //winston.format.prettyPrint(),
        ),
        meta: false, // optional: control whether you want to log the meta data about the request (default to true)
        msg: '[{{req.id}}], {{res.statusCode}}, {{req.method}}, {{res.responseTime}}ms, {{req.hostname}}, {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        headerBlacklist: ['Cookie'],
        ignoreRoute: function (req, res) {
          if (
            req.url.includes('static') ||
            req.url.includes('api') ||
            req.url.includes('images')
          )
            return true;

          return false;
        }, // optional: allows to skip some log messages based on request and/or response
      }),
    );

    // Set up the proxy.
    if (dev || process.env.WEBPACK_DEV_SERVER) {
      const { createProxyMiddleware } = require('http-proxy-middleware');

      Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    server.use('/live', health.LivenessEndpoint(healthCheck));
    server.use('/ready', health.ReadinessEndpoint(healthCheck));
    server.use('/health', health.HealthEndpoint(healthCheck));

    server.use('/api/rest', (req, res) => {
      // somehow nextjs is ddosing itself sending a request
      // req: /api/rest/pages/... , agent: axios/0.21.1, host: http_server_side_rendering
      res.sendStatus(404);
    });

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    if (isHttps) {
      // Listen to https ports
      const httpsServer = https.createServer(
        {
          key: fs.readFileSync('./etc/cert.key'),
          cert: fs.readFileSync('./etc/cert.crt'),
        },
        server,
      );

      httpsServer.listen(port, () => {
        console.log('HTTPS Server running on port', port);
        appFunctioning = true;
      });
    } else {
      server.listen(port, (err) => {
        if (err) {
          throw err;
        }
        console.log(`> Ready on port ${port} [${env || 'local'}]`);

        appFunctioning = true;
        //proccess.send('ready');
      });
    }
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);

    appFunctioning = false;
  });
