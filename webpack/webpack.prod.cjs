const webpack = require('webpack')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: './',
        filename: 'bundle.[contenthash].js',
        chunkFilename: '[name].[contenthash].bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
        }),
    ],
}
