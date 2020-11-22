const bodyParser = require('./body-parser');
const errorHandler = require('./error-handler');
const localeHandler = require('./i18n-handler');
const securityPolicy = require('./security-policy');


module.exports = {
    bodyParser,
    errorHandler,
    localeHandler,
    securityPolicy,
}
