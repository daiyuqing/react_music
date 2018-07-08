const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin=require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");   //引入对应插件
module.exports = {
  // devtool: 'source-map',       //模式选择，这里选择原始代码，因为开发环境不需要去混淆代码。
  mode: 'production',        //环境区分，是开发环境development还是生产环境production
  entry:{index:['./src/index.js']},   //入口文件
  output: {                  
    filename: '[name].js',    //输出文件
    hashDigestLength: 7,   //hash值设置
    path: path.resolve(__dirname, 'build')         //输出文件路径
  },
  module: {
    rules: [
      {
        //匹配js或jsx文件进行编译转换
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'babel-preset-env', 'stage-3'],
            plugins: [["transform-class-properties"],["import",{ "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]]
          }
        }
      },
      {
        //匹配css文件，进行抽离css
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        //匹配scss文件，进行抽离css
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },
      {
       //匹配图片
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
       //匹配字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    //输出特定的html文件
    new HtmlWebpackPlugin({
      title: 'my-app',
      template: 'public/index.html',
      favicon: 'src/static/images/favicon.ico'
    }),
    //抽离的css文件名
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),    //当开启 HMR 的时候使用该插件会显示模块的相对路径
    // new OpenBrowserPlugin({url: 'http://localhost:8888'})
  ]
};
