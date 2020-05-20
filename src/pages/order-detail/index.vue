<template>
<div class="page" ref="page" v-if="show">
	<common-header title="订单详情" back="/user/order"></common-header>
	<div class="order-status">
		<span class="iconfont">&#xe60b;</span>
		<span>买家{{order.statusInfo}}</span>
		<span>您的包裹已蓄势待发~</span>
	</div>
	<div class="address-container">
		<span class="iconfont position-icon">&#xe611;</span>
		<div class="address">
			<div class="address-detail">
				<div class="name">{{order.address.name}}<span>{{order.address.phone}}</span></div>
				<div class="address-content">{{addressContent}}</div>
			</div>
		</div>
	</div>
	<div class="cart-container">
		<div class="cart-item" v-for="item of order.goods" :key="item.id">
			<img :src="item.goods_img" alt="" class="cart-img">
			<div class="cart-desc">
				<div class="name">{{item.goods_name}}</div>
				<div class="price">{{item.goods_price}}</div>
				<div class="number iconfont">&#xe61a;{{item.buy_number}}</div>
			</div>
		</div>
	</div>
	<div class="order-count">
		<div class="row">
			<span>商品总额</span>
			<span>￥{{order.goodsTotal.toFixed(2)}}</span>
		</div>
		<div class="row" v-if="order.coupon_money > 0">
			<span>优惠劵抵扣</span>
			<span>-￥{{order.coupon_money.toFixed(2)}}</span>
		</div>
		<div class="row large">
			<span>实付款</span>
			<span class="total">￥{{order.total_price}}</span>
		</div>
	</div>
	<div class="order-count">
		<div class="row">
			<span>订单编号: {{order.order_no}}</span>
		</div>
		<div class="row">
			<span>订单状态: {{order.statusInfo}}</span>
		</div>
		<div class="row">
			<span>下单时间: {{order.create_time|dateFormat}}</span>
		</div>
		<div class="row" v-if="order.status > 1">
			<span>下单时间: {{order.create_time|dateFormat}}</span>
		</div>
		<div class="row" v-if="order.status > 2">
			<span>下单时间: {{order.update_time|dateFormat}}</span>
		</div>
		<div class="row" v-if="order.status > 3">
			<span>下单时间: {{order.update_time|dateFormat}}</span>
		</div>
	</div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
import {getOrderStatus, dateFormat} from '@/utils/function'
export default{
	props: {
	  id: Number
	},
	components:{
		CommonHeader
	},
	filters:{
		dateFormat(timeStamp){
			return dateFormat('YYYY-mm-dd HH:MM:SS',new Date(timeStamp * 1000))
		}
	},
	computed:{
		show(){
			return !!Object.keys(this.order).length
		},
		addressContent(){
			if(Object.keys(this.order).length === 0){
				return ''
			}
			return `${this.order.address.province} ${this.order.address.city} ${this.order.address.area} ${this.order.address.address}`
		}
	},
	data(){
		return{
			order: {}
		}
	},
	async mounted(){
		await this.getOrder()
		this.$nextTick(() =>{
			this.initData()
		})
	},
	methods:{
		initData(){
			const bodyHeight = document.documentElement.offsetHeight
			this.$refs.page.style.height = bodyHeight + 'px'
		},
		async getOrder(){
			this.$showLoading()
			const token = Token.getToken()
			const order = await this.axios.get('shose/order',{
				params:{
					id: this.id
				},
				headers: {
					token
				}
			}).then(res => res.order)
			order.statusInfo = getOrderStatus(order.status)
			order.coupon_money = parseFloat(order.coupon_money)
			order.goodsTotal = parseFloat(order.total_price) + order.coupon_money
			this.order = order
			this.$hideLoading()
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
	width: 100%;
	height: 100%;
	padding-top: $header-h;
	background-color: $color-bg;
	.order-status{
		width: 100%;
		height: 2.3rem;
		background-color: $color-global;
		@include layout-flex(column);
		color: #ffffff;
		font-size: .3rem;
		line-height: 1.3em;
		.iconfont{
			font-size: .8rem;
			margin-bottom: .4rem;
		}
	}
	.address-container{
		width: 100%;
		height: 1.8rem;
		margin-top: .2rem;
		background: $color-white;
		border-radius: .1rem;
		padding: .2rem;
		box-sizing: border-box;
		@include layout-flex;
		.position-icon{
			color: $color-global;
			font-size: .7rem;
		}
		.address{
			width: 0;
			flex: 1;
			height: 100%;
			margin-left: .2rem;
			.address-detail{
				width: 100%;
				height: 100%;
				@include layout-flex(column, $align: flex-start);
				.name{
					line-height: .6rem;
					font-size: .32rem;
					color: $color-three;
					span{
						font-size: .24rem;
						color: $color-nine;
						margin-left: .2rem;
					}
					.address-content{
						font-size: .24rem;
						color: $color-six;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						line-height: 14px;
						@include layout-ellipsis;
					}
				}
			}
		}
	}
	.cart-container{
		width: 100%;
		background-color: $color-white;
		padding: .2rem;
		box-sizing: border-box;
		border-radius: .2rem;
		margin-top: .2rem;
		.cart-item{
			width: 100%;
			height: 1.8rem;
			@include layout-flex;
			margin-bottom: .2rem;
			&:last-child{
				margin-bottom: 0;
			}
			.cart-img{
				width: 1.8rem;
				height: 1.8rem;
			}
			.cart-desc{
				width: 0;
				flex: 1;
				margin-left: .2rem;
				height: 80%;
				font-size: .28rem;
				color: $color-six;
				@include layout-flex(column, space-between, flex-start);
				.name{
					width: 100%;
					@include layout-ellipsis;
				}
				.number{
					font-size: .24rem;
					color: $color-nine;
				}
			}
		}
	}
	.order-count{
		width: 100%;
		margin-top: .6rem;
		padding: 0 .2rem;
		box-sizing: border-box;
		.row{
			width: 100%;
			height: .4rem;
			@include layout-flex($justify: space-between);
			font-size: .2rem;
			color: $color-three;
			&.large{
				height: .6rem;
				font-size: .28rem;
				.total{
					color: $color-global;
				}
			}
		}
	}
}
</style>
