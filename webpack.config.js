const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.js',
        assetModuleFilename: 'assets/images/[name][ext][query]'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets/images", to: "assets/images" },
                { from: "assets/fonts/icomoon/fonts", to: "assets/fonts/icomoon/fonts" },
                { from: "assets/fonts/icomoon/style.css", to: "assets/fonts/icomoon/style.css" },
                { from: "src/css/lib", to: "src/css/lib" },
                { from: "src/js/lib", to: "src/js/lib" },
                { from: "src/js/app.js", to: "src/js/app.js" },
                { from: 'favicon.png', to: 'favicon.png', toType: 'file' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.(?:ico|svg|gif|png|jpg|jpeg)$/,
                type: 'asset/resource'
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ]
    },
};