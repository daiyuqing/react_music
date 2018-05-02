

const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const OpenBrowserPlugin=require('open-browser-webpack-plugin');

const config={
	mode: 'development',
	entry:{
		app:['webpack-dev-server/client?http://localhost:3000/','./src/index.js']
	},
	output:{
		filename:'bundle.js',
		path:path.join(__dirname, 'build')
	},
	module:{
		rules:[
			{ 
				test: /\.(js|jsx)$/, 
				use: [
					{
						loader:'babel-loader' ,
						options:{ 
							presets: ['es2015', 'stage-0','react']
						}
					}
				],
				exclude: /node_modules/
			},
		]
	},
	// optimization:{
	// 	minimize:true
	// },
	plugins:[
    	new HtmlWebpackPlugin({
    		template: './templates/index.html',
    		inject:'body'
    	}),
    	new OpenBrowserPlugin({url:'http://localhost:3000'})
	],
	devServer: {
        contentBase: path.join(__dirname, "../build"), //网站的根目录为 根目录/dist
        port: 3000, //端口改为3000
        host: '192.168.0.103', //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
        open:true, // 自动打开浏览器
        index:'index.html', // 与HtmlWebpackPlugin中配置filename一样
        inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
        hot:false,
        compress:true //压缩
    }
}


module.exports=config;