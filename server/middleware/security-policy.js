const cors = require('cors');
const helmet = require('helmet');

module.exports = app => {
    // Setting various HTTP headers
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(helmet.hidePoweredBy({ setTo: `KP Development` }));

    // Cross-origin resource sharing
  app.use((req, res, next) => {
    console.log(req.hostname)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Accept-Language, Authorization, X-Requested-With')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')

    next()
  })
    /*
    app.use(cors({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Accept-Language, Authorization',
    }));
     */
}
