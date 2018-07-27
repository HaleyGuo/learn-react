const merge = require('webpack-merge');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // use: "css-loader"
                use: ["css-loader", "postcss-loader"]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*.*']),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash:5].css',
            allChunks: true
        })
    ]

};

module.exports = merge(commonConfig, publicConfig);


//
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// module.exports = {
//     devtool: 'cheap-module-source-map',
//     entry: {
//         app: [
//             path.join(__dirname, 'src/index.js')
//         ],
//         vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
//     },
//     output: {
//         path: path.join(__dirname, './dist'),
//         filename: '[name].[chunkhash].js',
//         chunkFilename: '[name].[chunkhash].js',
//         publicPath: "/"//让静态文件的链接定位到静态服务器
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: ['babel-loader'],
//                 include: path.join(__dirname, 'src')
//             }, {
//                 test: /\.css$/,
//                 use: ExtractTextPlugin.extract({
//                     fallback:"style-loader",
//                     use: "css-loader"
//                 })
//             }, {
//                 test: /\.(png|jpg|gif)$/,
//                 use: [{
//                     loader: 'url-loader',
//                     options: {
//                         limit: 8192
//                     }
//                 }]
//             }]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: path.join(__dirname, 'src/index.html')
//         }),
//         new UglifyJSPlugin(),
//         // library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容
//         new webpack.DefinePlugin({
//             'process.env': {
//                 'NODE_ENV': JSON.stringify('production')
//             }
//         }),
//         new webpack.HashedModuleIdsPlugin(),
//         new CleanWebpackPlugin(['dist/*.*']),
//         new ExtractTextPlugin({
//             filename:'[name].[hash:5].css',
//             allChunks:true
//         })
//
//     ],
//     optimization: {
//         splitChunks: {
//             name: 'vendor'
//         },
//         runtimeChunk: {
//             name: 'runtime'
//         }
//     },
//
//     resolve: {
//         alias: {
//             pages: path.join(__dirname, 'src/pages'),
//             components: path.join(__dirname, 'src/components'),
//             router: path.join(__dirname, 'src/router'),
//             actions: path.join(__dirname, 'src/redux/actions'),
//             reducers: path.join(__dirname, 'src/redux/reducers')
//         }
//     }
// };