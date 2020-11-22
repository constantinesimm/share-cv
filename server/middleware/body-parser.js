const bodyParser = require('body-parser');

module.exports = app => {
    // Request body parsing middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};
