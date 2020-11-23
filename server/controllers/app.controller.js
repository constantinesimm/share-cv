const subdomain = require('express-subdomain');
const routes = {
    auth: require('../modules/app/users/controllers/auth.controller')
};


module.exports = app => {
    app
      .use(subdomain('app', routes.auth))
      .use('/api/auth', routes.auth)
};
