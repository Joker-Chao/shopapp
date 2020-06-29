<template>
<div class="coupon-list">
	<div class="coupon-item" :class="'status-bg' + item.status" v-for="item of couponList" :key="item.id">
		<div class="coupon-info">
			<div class="coupon-title">
				<div class="coupon-money">
					￥<span class="money">{{item.couponMoney}}</span>
				</div>
				<div class="coupon-desc">优惠券</div>
			</div>
			<div class="coupon-time">{{item.startTime}}-{{item.endTime}}</div>
		</div>
		<div class="coupon-status">
			<div class="status-text">{{item.statusText}}</div>
		</div> 
	</div>
</div>

</template>

<script>
	export default{
		props:{
			couponList:Array
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.coupon-list{
	width: 100%;
	height: auto;
	@include layout-flex(column);
}
.coupon-item{
	width: 5.8rem;
	height: 2.34rem;
	margin-top: .2rem;
	@include layout-flex;
	&.status-bg1{
		background: url(../../assets/images/card_stock-01.png);
		background-size: contain;
		.coupon-status{
		  color: #ff5e46;
		}
	}
	&.status-bg2{
		background: url(../../assets/images/card_stock-02.png);
		background-size: contain;
		.coupon-status{
		  color: #ff7c76;
		}
	}
	&.status-bg3{
		background: url(../../assets/images/card_stock-03.png);
		background-size: contain;
		.coupon-status{
		  color: #999999;
		}
	}
	.coupon-info{
		width: 3.4rem;
		height: 100%;
		@include layout-flex(column);
		color: $color-white;
		.coupon-title{
			width: 2.4rem;
			height: .7rem;
			@include layout-flex($align: baseline);
			margin-bottom: .4rem;
			.coupon-money{
				font-size: .48rem;
				.money{
					font-size: .72rem;
					font-weight: 600;
				}
			}
			.coupon-desc{
				font-size: .32rem;
				margin-left: .3rem;
			}
			.coupon-time{
				width: 2.6rem;
				font-size: .22rem;
				margin-top: .5rem;
			}
		}
	}
	.coupon-status{
		width: 2.4rem;
		height: 100%;
		@include layout-flex;
		.status-text{
			width: 1rem;
			font-size: .5rem;
			font-weight: 600;
			line-height: 1.2em;
		}
	}
}
</style>
