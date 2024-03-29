const path = require('path');

module.exports = {
    lintOnSave: false,
    assetsDir: './assets/',
    configureWebpack: {
        devServer: {
            clientLogLevel: 'info',
            watchOptions: {
                poll: true
            }
        },
        output: {
            filename: 'share-cv.min.js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 10000,
                maxSize: 245000,
            }
        }
    },
    chainWebpack: config => {
        // change main path name from 'client' to 'client'
        config.entry('app').clear().add('./client/main.js').end();
        config.resolve.alias.set('@', path.join(__dirname, './client'));

        // remove html hints
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');

        // change html template path and add minify
        config
            .plugin('html')
            .tap(args => {
                args[0] = {
                    template: path.join(__dirname, './public/index.html'),
                    minify: {
                        removeComments: true,
                        collapseWhitespace: false,
                        removeAttributeQuotes: false
                    }
                };

                return args;
            });
    }
};
