const webpack = require('webpack')
const BundleAnalyzePlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
        }),
        // In CI we must not launch an interactive analyzer server because it blocks the build.
        // Generate a static report instead and don't open the analyzer.
        new BundleAnalyzePlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-report.html',
        }),
    ],
}
