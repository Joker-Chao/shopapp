/*
 *	@Descripttion:
 */

module.exports = {
  devServer: {
    host: "localhost",
    port: 1717,
    inline: true,
    proxy: {
      "/api": {
        target: "http://api.2yue.cc/index.php/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  publicPath: "/",
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  }
};
