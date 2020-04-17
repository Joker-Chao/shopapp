<template>
	<div id="search">
		<div class="search-warp">
			<span class="iconfont search-icon">&#xe600;</span>
			<span class="search-name">{{placeHolder}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			placeHolder:{
				type: String,
				default: "搜索内容名称"
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  "~@/assets/scss/global";
	#search{
	    width: 100%;
	    height: 0.88rem;
	    text-align: center;
	    background-color: $color-global;
	    box-sizing: border-box;
	    padding: 0 0.4rem;
	    overflow: hidden;
		.search-warp{
		    width: 100%;
		    height: 0.56rem;
		    line-height: 0.56rem;
		    font-size: 0.26rem;
		    background-color: #ffffff;
		    border-radius: 0.28rem;
		    color: #b2b2b2;
		}
		.search-warp .search-icon{
		    font-size: 0.28rem;
		}
	}
</style>
