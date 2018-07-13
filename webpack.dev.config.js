const path = require('path');
module.exports = {

    // 入口
    entry: [
        // 用来保持react中的state
        'react-hot-loader/patch',

        path.join(__dirname, 'src/index.js')
    ],
    // 输出到dist文件夹，输出文件名字为bundle.js
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
        /*cacheDirectory是用来缓存编译结果，下次编译加速*/
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                //include: path.join(__dirname, 'src'),
            }
        ]
    },
    // webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 3001,
        historyApiFallback: true,
        hot: true
    },
    // 别名
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),

            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
        }
    },

    devtool: 'inline-source-map',//对控制台报错信息的优化
}