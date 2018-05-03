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
new webpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: false,
    stats: {
      colors: true
    }
  }).listen(8888, 'localhost', function (error) {
  if (error) {
    console.error(error);
  }
});