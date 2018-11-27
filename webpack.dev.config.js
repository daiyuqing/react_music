
const path=require('path');
const merge = require('webpack-merge');
const baseWebpackConfig=require('./webpack.base.config.js');
const webpack=require('webpack');
const config=merge(baseWebpackConfig,{
    mode:'development',
    module: {
        rules: [
             {
                test: /\.(scss|sass|css)$/,
                use:  ['style-loader', 'css-loader', 'sass-loader']
             }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        open:true,
        port: 3000,
        hot:true,
        historyApiFallback: true,
        proxy: {
	        '/kugou': {
	            target: 'http://m.kugou.com/',
	            changeOrigin:true,
	            pathRewrite: {"^/kugou" : ""}
	        },
	        "/yy_kugou": {
	            target: "http://www.kugou.com/yy/",
	            changeOrigin: true,
	            pathRewrite: {"^/yy_kugou" : ""}
	        },
	        "/mobilecdn": {
	            target: "http://mobilecdn.kugou.com",
	            changeOrigin: true,
	            pathRewrite: {"^/mobilecdn" : ""}
	        }
	    }
    }
});


module.exports=config;