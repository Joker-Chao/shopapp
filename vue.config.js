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
        target: "http://api.4yue.top/index.php/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  publicPath: "/shose",
  outputDir: "shose",
  assetsDir: "static",
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  }
};
