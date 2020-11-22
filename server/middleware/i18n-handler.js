const { i18n } = require('../libs');

module.exports = app => {
    app.use((req, res, next) => {
        console.log(req.headers)
        i18n.setLocale(req.headers['accept-language']);

        next();
    }).use(i18n.init)
}
