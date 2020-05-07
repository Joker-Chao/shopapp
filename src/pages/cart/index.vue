<template>
	<div class="page">
		<common-header :title="'购物车'" :back="backUrl" :manage="true"></common-header>
		<div class="cart-list">
			<div v-for="item of cart" :key="item.id" @touchstart="touchStart" :data-goods-id="item.id" @touchend="touchEnd">
				<router-link tag="div" :to="`goods-detail/${item.id}`" class="cart-item" :class="{'del-move': item.delete}"  >
					<input type="checkbox" class="checkbox" :checked="item.selected" :data-goods-id="item.id" @click="toggleSelect">
					<div class="goods-img-warpper">
						<img :src="item.img" alt="" class="goods-img">
					</div>
					<div class="goods-desc">
						<h5 class="goods-title">{{item.name}}</h5>
						<div class="goods-price">￥{{item.price}}</div>
						<div class="number-change clearfix">
							<span class="iconfont reduce" :class="item.number===1?disable:''" :data-goods-id="item.id" @click="reduceNumber">&#xe794;</span>
							<span class="number">{{item.buyNumber}}</span>
							<span class="iconfont add" :data-goods-id="item.id" @click="addNumber">&#xe795;</span>
						</div>
					</div>
					<div class="del" :data-goods-id="item.id" @click="delCartGoods">删除</div>
				</router-link>
			</div>
		</div>
		<div class="cart-count border-top">
			<div class="check-all">
				<input type="checkbox" class="checkbox" :checked="selectAll" @click="toggleSelectAll(selectAll)"> 
				<template v-if="selectAll">全不选</template>
				<template v-else>全选</template>
			</div>
			<div class="price-total">
				合计：<span>￥{{totalPrice.toFixed(2)}}</span>
			</div>
			<div class="settle" @click="submitCart">去结算<span v-if="(cartNum !== 0)">({{cartNum}})</span></div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import CommonHeader from '@/components/Header';
	import CommonFooter from '@/components/Footer';
	import { LocalStorage } from '@/utils/storage';
	import { stopPropagation } from '@/utils/function'
	
	let touchStartX = 0, touchStartTime = 0
	export default{
		components:{
			CommonHeader,
			CommonFooter
		},
		beforeRouteEnter(to,from,next){
			next(vm => {
				vm.backUrl = from.path 
			}) 
		},
		data(){
			return{
				backUrl: '',
				cart: [],
				selectAll: false,
				totalPrice: 0,
				cartNum: 0
			}
		},
		mounted(){
			const cart = LocalStorage.getItem('cart') || []
			if (cart.length > 0) {
				this.cart = cart.map(item => {
					if (!Reflect.has(item, 'delete')) {
						item.delete = false
					}
					return item
				})
			}
			this.countCart()
		},
		methods:{
			stopPropagation(e,List) {
				return stopPropagation(e,List);
			},
			delCartGoods(e){
				const {goods,index} = stopPropagation(e,this.cart)
				this.$showModel({
					content:"确定要删除吗",
					success: res => {
						if(res.confirm){
							this.cart.splice(index,1)
							this.countCart()
						}
						if (res.cancel) {
							goods.delete = false
						}
					}
				})
			},
			addNumber(e){
				const {goods} = stopPropagation(e,this.cart)
				goods.buyNumber++
				this.countCart()
			},
			reduceNumber(e){
				const {goods} = stopPropagation(e,this.cart)
				if(goods.buyNumber > 1){
					goods.buyNumber--
					this.countCart()
				}
			},
			toggleSelect(e){
				const {goods} = stopPropagation(e,this.cart)
				goods.selected = !goods.selected
				this.countCart()
			},
			touchStart(e){
				
				touchStartX = e.changedTouches[0].clientX
				touchStartTime = e.timeStamp
			},
			touchEnd(e){
				const elem = e.currentTarget
				const distance = e.changedTouches[0].clientX - touchStartX
				const time = e.timeStamp - touchStartTime
				const goodsId = parseInt(elem.dataset.goodsId)
				const index = this.cart.findIndex(item => item.id === goodsId)
				if(distance < -100 && time < 500){
					this.cart.forEach((item, key) => {
						if (key !== index) {
							item.delete = false
						} else {
							item.delete = true
						}
					})
					setTimeout(() => {
						this.cart[index].delete = false
					},3000)
				}
				if(distance > 100 && time < 500){
					this.cart[index].delete = false
				}
			},
			countCart(){
				let selectAll = [],totalPrice = 0,cartNum = 0
				this.cart.forEach(item => {
					if(item.selected){
						totalPrice += item.price * item.buyNumber
						cartNum++
						selectAll.push(true)
					}
				})
				this.selectAll = selectAll.length > 0 ? selectAll.length === this.cart.length : false
				this.totalPrice = totalPrice
				this.cartNum = cartNum
				LocalStorage.setItem('cart',this.cart)
			},
			toggleSelectAll(){
				this.cart.forEach(item => {
					item.selected = !this.selectAll
				})
				this.countCart()
			},
			submitCart(){
				if(this.cartNum === 0){
					this.$showToast({
						message: '至少选择一个商品'
					})
					return
				}
				this.$router.push('/order?loginRedirect='+ encodeURIComponent('/order'))
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  margin-top: $header-h;
  padding-bottom: $footer-h+.9rem;
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
  .cart-count{
  	width: 100%;
  	height: .9rem;
  	background-color: $color-white;
  	box-sizing: border-box;
  	padding-left: .2rem;
  	position: fixed;
  	left: 0;
  	bottom: $footer-h;
  	@include layout-flex($justify:space-between);
  	.checkbox{
  		appearance: none;
  		-webkit-appearance: none;
  		-moz-appearance: none;
  		width: .3rem;
  		height: .3rem;
  		margin-right: .1rem;
  		background: url(/images/checkbox.png) no-repeat;
  		outline: none;
  		background-size: contain;
  		&:checked{
  			background: url(/images/checkbox@selected.png) no-repeat left bottom;
  			background-size: contain;
  		}
  	}
  	.price-total{
  		flex: 1;
  		margin: 0 .5rem;
  		height: 100%;
  		display: flex;
  		align-items: center;
  		span{
  			font-size: .32rem;
  			color: $color-global;
  			font-weight: 700;
  		}
  	}
  	.settle{
  		width: 2.2rem;
  		height: 100%;
  		font-size: .32rem;
  		background-color: $color-global;
  		color: $color-white;
  		@include layout-flex;
  	}
  }
}
</style>
