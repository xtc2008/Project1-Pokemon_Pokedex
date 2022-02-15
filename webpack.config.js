const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
    mode: process.env.NODE_ENV,
    //process.env.NODE_ENV
    module: {
        rules: [
            {
            test: /jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            },
            },
            {
              test: /scss$/,
              exclude: /node_modules/,
              use: [
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
              ]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Development',
          template: './index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        static: {
            publicPath: '/build',
            directory: path.resolve(__dirname, 'build'),
            // hot: true,
        },
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
};