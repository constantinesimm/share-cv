const app = require('express')();

const appControllers = require('./controllers');
const { mongoConnection } = require('./libs');
const {
    bodyParser,
    errorHandler,
    localeHandler,
    securityPolicy
} = require('./middleware');

/**
 * Databases Connection
 */
mongoConnection();


/**
 * App Middleware
 * HTTP Requests - body-parser package
 * HTTP Headers - helmet package
 * CORS - cors package
 * Locales - i18n package
 */
bodyParser(app);
securityPolicy(app);
localeHandler(app)




/**
 * App Controller with subdomains
 */
appControllers(app);


/**
 * Error handler middleware
 */
errorHandler(app);

module.exports = app;
