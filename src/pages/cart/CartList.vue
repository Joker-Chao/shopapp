<template>
	<ul class="cart-list">
		<li v-for="item of cart" :key="item.id" @click="toGoodsDetail(item.id)" :class="{'del-move': item.delete}" class="cart-item" @touchstart="touchStart" :data-goods-id="item.id" @touchend="touchEnd">
			<input type="checkbox" class="checkbox" :checked="item.selected" @click="toggleSelect(item.id)">
			<div class="goods-img-warpper">
				<img :src="item.img" alt="" class="goods-img">
			</div>
			<div class="goods-desc">
				<h5 class="goods-title">{{item.name}}</h5>
				<div class="goods-price">￥{{item.price}}</div>
				<div class="number-change clearfix">
					<span class="iconfont reduce" @click="reduceNumber(item.id)">&#xe794;</span> <!-- ${item.number===1 ? 'disable' : ''} -->
					<span class="number">{{item.buyNumber}}</span>
					<span class="iconfont add" @click="addNumber(item.id)">&#xe795;</span>
				</div>
			</div>
			<div class="del" @click="delCartGoods(item.id)">删除</div>
		</li>
	</ul>
</template>

<script>
	let touchStartX = 0, touchStartTime = 0
	export default{
		props:{
			cart: Array
		},
		methods:{
			toGoodsDetail(){
				
			},
			delCartGoods(){
				
			},
			addNumber(){
				
			},
			reduceNumber(){
				
			},
			toggleSelect(){
				
			},
			touchStart(event){
				touchStartX = event.changedTouches[0].clientX
				touchStartTime = event.timeStamp
			},
			touchEnd(event){
				const elem = event.currentTarget
				const distance = event.changedTouches[0].clientX - touchStartX
				const time = event.timeStamp - touchStartTime
				console.log(elem,distance,time)
				if(distance < -100 && time < 500){
					console.log(111)
				}
				if(distance > 100 && time < 500){
					console.log(222)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
	.cart-list{
		width: 100%;
		position: relative;	
		padding-bottom: .2rem;
		.cart-item{
			width: 100%;
			height: 2.4rem;
			box-sizing: border-box;
			padding: .2rem .2rem .2rem .7rem; 
			@include layout-flex($justify:space-between);
			border-bottom: 1px solid #B2B2B2;
			position: relative;
			transition: all 1s;
			&.del-move{
				left: -1.6rem;
				transition: all 1s;
			}
			.checkbox{
			  appearance: none;
			  -webkit-appearance: none;
			  -moz-appearance: none;
			  width: .3rem;
			  height: .3rem;
			  background: url(/images/checkbox.png) no-repeat;
			  outline: none;
			  background-size: contain;
			  position: absolute;
			  left: .2rem;
			  top: 50%;
			  transform: translateY(-50%);
			  &:checked{
			    background: url(/images/checkbox@selected.png) no-repeat left bottom;
			    background-size: contain;
			  }
			}
			.goods-img-warpper{
				width: 2rem;
				height: 2rem;
				border-radius: .1rem;
				border: .1px solid #B2B2B2;
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
				flex: 1;
				position: relative;
				.goods-title{
					font-size: .28rem;
					color: $color-six;
					@include layout-ellipsis;
					font-weight: 700;
				}
				.goods-price{
					color: #FF5E46;
					font-size: .36rem;
					margin-top: 1rem;
				}
				.number-change{
					width: 1.55rem;
					height: .4rem;
					position: absolute;
					right: .2rem;
					bottom: .2rem;
					line-height: .4rem;
					text-align: center;
					span{
						float: left;
						border-top: 1px solid $color-nine;
						border-bottom: 1px solid $color-nine;
						box-sizing: border-box;
						height: 100%;
						color: $color-six;
						&.reduce,&.add{
							width: .4rem;
							border-left: 1px solid $color-nine;
							border-right: 1px solid $color-nine;
							box-sizing: border-box;
						}
						&.number{
							width: .75rem;
							color: $color-three;
							&.disable{
								color: $color-three;
								cursor: not-allowed;
							}
						}
					}
				}
			}
			.del{
				width: 1.6rem;
				height: 2.4rem;
				background-color: #f51f24;
				@include layout-flex;
				color: $color-white;
				font-size: .36rem;
				position: absolute;
				top: 0;
				right: -1.6rem;
				transition: all 1s;
			}
		}
	}
</style>
