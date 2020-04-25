<template>
	<div class="container">
		<div class="title">
			<span class="name">{{title}}</span>
			<span class="more" v-if="show">更多 <i class="iconfont">&#xe63c;</i></span>
		</div>
		<slot name="content"></slot>
	</div>
</template>

<script>
	export default{
		props:{
			title: String,
			morePath: {
				type: String,
				default: ''
			}
		},
		computed: {
			show () {
			  return this.morePath.trim() !== ''
			}
  }
	}
</script>

<style lang="scss" scoped>
	@import "~@/assets/scss/global";
	.container{
		@include layout-container;
		.title{
			@include layout-flex($justify:space-between);
			width: 100%;
			height: .4rem;
			font-size: 0.32rem;
			font-weight: 600;
			.name{
				border-left: 0.04rem solid $color-global;
				padding-left: 0.2rem;
				box-sizing: border-box;
			}
			.more{
				font-weight: normal;
				font-size: 0.24rem;
				color: $color-six;
			}
		}
	}
</style>
