const mongoose = require('mongoose');
const { mongodb } = require('../../config').database;

module.exports = () => {
    return mongoose
        .connect(mongodb.uri, mongodb.options)
        .then(() => console.info('♦♦♦♦♦ Database(mongoDB) connected ♦♦♦♦♦'))
        .catch(error => console.error(`♦♦♦♦♦ Database(mongoDB) error - ${ error } ♦♦♦♦♦`));
};
