const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    mode: 'production',
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ],
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    { 
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env'] }
                    }
                ]
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/scripts/manifest.json', to: 'manifest.json' },
                { from: './src/assets/icon192.png', to: 'assets/icon192.png' },
                { from: './src/assets/icon512.png', to: 'assets/icon512.png' },
            ],
        }),
        new WebpackAssetsManifest({
            output: 'asset-manifest.json',
            writeToDisk: true,
        }),
        new InjectManifest({
            swSrc: './src/scripts/service-worker.js',
            swDest: 'service-worker.js',            
            compileSrc: true,
        }),
    ],
    devServer: {
        static: './dist',
        port: 3000,
        open: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            }
        }
    }
};