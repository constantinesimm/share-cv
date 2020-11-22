const cors = require('cors');
const helmet = require('helmet');

module.exports = app => {
    // Setting various HTTP headers
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(helmet.hidePoweredBy({ setTo: `KP Development` }));

    // Cross-origin resource sharing
    app.use(cors({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Accept-Language, Authorization',
    }));
}
