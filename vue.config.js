/*
 *	@Descripttion:
 */

module.exports = {
  devServer: {
    host: "localhost",
    port: "8888",
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
  }
};
