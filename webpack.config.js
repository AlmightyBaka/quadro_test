const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const webpack = require('webpack')

module.exports = [{
    name: "bundle",
    mode: "none",
    entry: './src/index.ts',
    target: 'node',
    externals: [nodeExternals(), { crypto: 'null'}],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
        new NodemonPlugin(),
    ],
}]