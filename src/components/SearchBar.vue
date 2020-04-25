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
	    height: $search-h;
	    background-color: $color-global;
	    padding: .15rem .4rem;
	    box-sizing: border-box;
		text-align: center;
	    overflow: hidden;
		position: fixed;
		left: 0;
		top: $header-h;
		z-index: 100;
		.search-warp{
		    width: 100%;
		    height: 100%;
		    line-height: 0.58rem;
		    font-size: 0.26rem;
		    background-color: $color-white;
		    border-radius: 0.3rem;
		    color: #b2b2b2;
		}
		.search-warp .search-icon{
		    font-size: 0.28rem;
		}
	}
</style>
