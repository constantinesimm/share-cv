const fs = require('fs');
const { join } = require('path');
const express = require('express');
const { HttpError } = require('../utils');
const { staticBasePath } = require('../config');

/**
 * App modules routes
 */
const appController = require('./app.controller');

/**
 * Static Files
 */
const indexHtml = join(__dirname, `../${ staticBasePath }/index.html`);
const staticPath = join(__dirname, `../${ staticBasePath }`);

module.exports = app => {
    /**
     * SubDomain Handler
     */
    appController(app);

    /**
     * HTTPS Redirect on production
     */
    if (process.env.NODE_ENV === 'production') {
        app.use((req, res, next) => {
            return req.header('x-forwarded-proto') !== 'https' ? res.redirect(`https://${req.header('host')}${req.url}`) : next()
        })
    }

    /**
     * Static Files
     */
    app.use(express.static(staticPath));

    // send index.html file to client on every get request
    app.get('*', (req, res) => {
        // get index.html actual file size
        fs.stat(indexHtml, (error, stats) => error ?
            new HttpError(500, error.message) :
            res.set({
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Length': stats.size
            })
        )

        //send index.html to client
        fs.createReadStream(indexHtml).pipe(res);
    })
}
