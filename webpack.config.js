const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserMinimizerPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },

    resolve: {
        extensions: ['.js'],

        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/css'),
            '@scripts': path.resolve(__dirname, 'src/js'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
        }
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
            filename: "index.html"
        }),

        new MiniCssExtractPlugin({
            filename: 'assets/styles/[name].[contenthash].css'
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images",
                }
            ]
        }),

        new Dotenv(),

        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserMinimizerPlugin()
        ]
    }
}