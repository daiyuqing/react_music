const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:{index:['./src/index.js']},   //入口文件
  output: {                  
    filename: '[name].js',    //输出文件
    hashDigestLength: 7,   //hash值设置
    path: path.resolve(__dirname, 'build/js')         //输出文件路径
  },
  resolve:{
      alias:{
          containers:path.resolve(__dirname, 'src/containers/'),
          components: path.resolve(__dirname, 'src/components/'),
          actions: path.resolve(__dirname, 'src/actions/'),
          reducers: path.resolve(__dirname, 'src/reducers/'),
          util: path.resolve(__dirname, 'src/util/'),
          static:path.resolve(__dirname, 'src/static/')
      }
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        use:{
            loader:'babel-loader',
            options:{
                plugins:[
                    ["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]
                ]
            }
        }
      },
      {
          test: /\.(png|jpg|gif)$/,
          use:{
              loader: 'url-loader?limit=50000&name=[path][name].[ext]',
              options: {
                  outputPath: 'img/',
                  name: '[name].[ext]?[hash]',
              }
          }
      },
      {
          test: /\.(woff|svg|eot|ttf)\??.*$/,
          use: 'url-loader?limit=50000&name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //输出特定的html文件
    new HtmlWebpackPlugin({
      title: 'react-music',
      template: 'public/index.html',
      favicon: 'src/static/images/favicon.ico'
    })
  ]
};
