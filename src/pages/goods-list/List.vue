<template>
	<div class="goods-list">
		<div class="goods-item" v-for="item of goodsList" :key="item.id">
			<div class="goods-img-warpper">
				<img class="goods-img" :src="item.img" alt="">
			</div>
			<div class="goods-desc">
				<h5 class="goods-title">{{item.name}}</h5>
				<div class="goods-price"><span>￥{{item.price|formatPrice}}</span><span class="market">￥{{item.market_price|formatPrice}}</span></div>
				<div class="goods-brower">{{item.sale_num}}人购买</div>
				<div class="btn" @click="addToCart(item)">加入购物车</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { filters } from '@/utils/mixins';
	import { LocalStorage } from '@/utils/storage';
	export default{
		props:{
			goodsList: Array
		},
		mixins:[filters],
		methods:{
			addToCart(goods){
				if(Object.keys(goods).length === 0){
					return
				}
				const cart = LocalStorage.getItem('cart') || []
				console.log(cart)
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list{
	width: 100%;
	padding: 0 .2rem;
	box-sizing: border-box;
	.goods-item{
		width: 100%;
		height: 2.2rem;
		padding: .2rem 0;
		display: flex;
		.goods-img-warpper{
			width: 2.2rem;
			height: 2.2rem;
			border-radius: .1rem;
			border: 1px solid #B2B2B2;
			box-sizing: border-box;
			overflow: hidden;
			.goods-img{
				width: 100%;
				height: 100%;
			}
		}
		.goods-desc{
			padding: .2rem;
			width: 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			position: relative;
			.goods-title{
				width: 100%;
				font-size: .32rem;
				color: $color-six;
				@include layout-ellipsis;
				font-weight: 700;
				color: $color-three;
			}
			.goods-price{
				width: 100%;
				color: $color-global;
				font-size: .36rem;
				margin-top: .7rem;
				font-weight: 700;
				line-height: .4rem;
				.market{
					color: $color-nine;
					font-size: .3rem;
					margin-left: 0.2rem;
					font-weight: 400;
					text-decoration: line-through;
				}
			}
			.goods-brower{
				color: $color-nine;
				font-size: .28rem;
			}
			.btn{
				width: 1.4rem;
				height: .6rem;
				line-height: .6rem;
				background-color: $color-global;
				color: $color-white;
				border-radius: .3rem;
				position: absolute;
				bottom: .3rem;
				right: .1rem;
				font-size: .24rem;
				text-align: center;
			}
		}
	}
}
</style>
