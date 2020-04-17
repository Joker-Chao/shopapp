/*
*	@Descripttion: 
*/

module.exports = {
  devServer: {
    port: "8888",
	inline: true,
	proxy:{
		'/api':{
			target:'http://www.api.com/index.php/',
			changeOrigin: true
		}
	}
  }
}