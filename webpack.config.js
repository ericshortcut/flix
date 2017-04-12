var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry  : './src/app.js',
    output : {
        path : __dirname + '/dist',
        filename :'app.bundle.js'
    },
    module :{
        rules: [
            {test: /\.scss/, use: ['style-loader','css-loader','sass-loader']}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Index',
            template: `src/views/index.ejs`,
            inject: 'body',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Index',
            template: `src/views/partials/main.ejs`,
            inject: 'body',
            filename: 'main.htm'
        }),
         new HtmlWebpackPlugin({
            title: 'Favorites',
            template: `src/views/partials/favorites.ejs`,
            inject: 'body',
            filename: 'favorites.htm'
        }),
         new HtmlWebpackPlugin({
            title: '404',
            template: `src/views/partials/404.ejs`,
            inject: 'html',
            filename: '404.htm'
        })
    ]
};
