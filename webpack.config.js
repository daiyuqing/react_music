

const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const OpenBrowserPlugin=require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

const config={
	mode: 'development',
	entry:{index:['./src/index.js']},
	output:{
		filename:'index.js',
		path:path.join(__dirname, 'build')
	},
	module:{
		rules:[
			{ 
				test: /\.js$/,
	            exclude: path.resolve(SRC_PATH, 'node_modules'),
	            include: SRC_PATH,
	            use: {
	                loader: 'babel-loader',
	                options: {
	                    presets: ['react', 'es2015', 'stage-0']
	                }
	            }
			},
			{ 
				test: /\.css$/,
	            exclude: path.resolve(SRC_PATH, 'node_modules'),
	            include: SRC_PATH,
	            use: [
	            	{ loader: 'css-loader'},
	            	{ loader: 'style-loader'}
	            ]
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
    	new ExtractTextPlugin('style.css', {
	      allChunks: true
	    }),
    	new webpack.HotModuleReplacementPlugin(),
    	new OpenBrowserPlugin({url: 'http://localhost:8888'})
	]
}


module.exports=config;