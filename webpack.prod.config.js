const CleanWebpackPlugin=require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig=require('./webpack.base.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config=merge(baseWebpackConfig,{
    mode:'production',
    module:{
    rules:[
      {
          test: /\.(scss|sass|css)$/,
          use: [
              MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
          ]
      }
    ]
  },
    plugins:[
        new CleanWebpackPlugin(['build']),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "css/[id].css"
        })
    ]
});


module.exports=config;
