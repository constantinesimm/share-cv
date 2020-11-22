const JWT = require('./jwt');
const i18n = require('./i18n');
const emailHandler = require('./mailer');
const mongoConnection = require('./database/mongoose');

module.exports = {
    JWT,
    i18n,
    emailHandler,
    mongoConnection,
}
