const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader', "postcss-loader"]
            // use: ["style-loader", "css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            MOCK: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        port: 3001,
        hot: true,
        host:'127.0.0.1',
        proxy: {
            "/api/*": "http://localhost:3001/$1"
        }
    }
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);


//
// const path = require('path');
// const HtmlWebpaclPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
//
// module.exports = {
//     // 入口
//     entry: {
//         app: [
//             // 用来保持react中的state
//             'react-hot-loader/patch',
//             path.join(__dirname, 'src/index.js')
//         ],
//         vendor:['react','react-router-dom','redux','react-dom','react-redux']
//     },
//     // 输出到dist文件夹，输出文件名字为bundle.js
//     output: {
//         path: path.join(__dirname, './dist'),
//         filename: '[name].[hash].js',
//         chunkFilename: "[name].[chunkhash].js"//但是你可能发现，名字都是0.bundle.js这样子的，
//         // 这分不清楚是哪个页面的js呀！chunkFilename是除了entry定义的入口js之外的js
//     },
//     mode: 'development',
//     module: {
//         /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
//         /*cacheDirectory是用来缓存编译结果，下次编译加速*/
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: ['babel-loader?cacheDirectory=true'],
//                 include: path.join(__dirname, 'src'),
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'],
//             },
//             {
//                 test: /\.(png|jpg|gif)$/,
//                 use: [{
//                     loader: 'url-loader',
//                     options: {
//                         limit: 8192//小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
//                     }
//                 }]
//             }
//         ]
//     },
//     // webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务
//     devServer: {
//         contentBase: path.join(__dirname, './dist'),
//         port: 3001,
//         historyApiFallback: true,
//         hot: true
//     },
//     // 别名
//     resolve: {
//         alias: {
//             pages: path.join(__dirname, 'src/pages'),
//             components: path.join(__dirname, 'src/components'),
//             router: path.join(__dirname, 'src/router'),
//
//             actions: path.join(__dirname, 'src/redux/actions'),
//             reducers: path.join(__dirname, 'src/redux/reducers'),
//         }
//     },
//
//     devtool: 'inline-source-map',//对控制台报错信息的优化
//
//     plugins: [
//         new HtmlWebpaclPlugin({
//         //这个插件，每次会自动把js插入到你的模板index.html里面去。
//         filename: 'index.html',
//         template: path.join(__dirname, 'src/index.html')
//     }),
//         // new webpack.optimize.CommonsChunkPlugin({
//         //     name: 'vendor'
//         // })
//     ]
// }