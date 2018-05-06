var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");

// 在入口文件数组中添加两个选项
// webpack-dev-server/client?http://localhost:8888
// webpack/hot/dev-server
config.entry.index.unshift('webpack-dev-server/client?http://localhost:8888', 'webpack/hot/dev-server');

  // 合并一个 devServer到配置文件
Object.assign(config, {
  devServer: {
    hot: true,
    inline: true
  }
})

// 编译
var compiler = webpack(config);

// 初始化一个webpack-dev-server
new webpackDevServer(webpack(config), {
    historyApiFallback: true, 
    hot: true,
    inline:true,
    noInfo: false,
    stats: {
        colors: true,
    },
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
}).listen(8888, 'localhost', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8888');
});