<template>
	<div class="footer-container border-top">
		<router-link tag="div" to="/" class="footer-nav">
			<span class="iconfont">&#xe601;</span>
			<span>首页</span>
		</router-link>
		<router-link tag="div" to="/category" class="footer-nav">
			<span class="iconfont">&#xe62c;</span>
			<span>分类</span>
		</router-link>                                     
		<router-link tag="div" to="/cart" class="footer-nav">
			<span class="iconfont">&#xe60c;</span>
			<span>购物车</span>
		</router-link>
		<router-link tag="div" to="/user" class="footer-nav">
			<span class="iconfont">&#xe6b1;</span>
			<span>我的</span>
		</router-link>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.footer-container{
	width: 100%;
	height: 1.3rem;
	background: $color-white;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 100;
	@include layout-flex;
	.footer-nav{
		width: 25%;
		height: 100%;
		@include layout-flex(column);
		font-size: .2rem;
		color: $color-six;
		.iconfont{
			font-size: .4rem;
			margin-bottom: .1rem;
		}
		&.active{
			color: $color-global;
		}
	}
}
</style>
