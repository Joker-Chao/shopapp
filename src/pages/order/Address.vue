<template>
<div class="address-container" @click="editAddress">
	<span class="iconfont position-icon">&#xe611;</span>
	<div class="address">
		<div v-if="showAddress" class="address-detail">
			<div class="name">{{address.name}}<span>{{address.phone}}</span></div>
			<div class="address-content">{{addressContent}}</div>
		</div>
		<div v-else class="empty-address">
			<span class="iconfont">&#xe760;</span>添加收货地址
		</div>
	</div>
	<span class="iconfont right">&#xe636;</span>
</div>
</template>

<script>
export default{
	props: {
	  address: Object
	},
	computed: {
		showAddress () {
			return !!Object.keys(this.address).length
		},
		addressContent () {
			if(Object.keys(this.address).length === 0) {
				return ''
			}else{
				return `${this.address.province} ${this.address.city} ${this.address.area} ${this.address.address}`
			}
		}
	},
	methods: {
		editAddress () {
			const id = this.address.id || 0
			const url = encodeURIComponent('/order')
			this.$router.push(`/order/address?id=${id}&url=${url}`)
		}
	}
}  
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
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
		.empty-address{
			width: 100%;
			height: 100%;
			@include layout-flex;
			color: $color-nine;
			font-size: .32rem;
			.iconfont{
				margin-right: .1rem;
				font-size: .8rem;
			}
		}
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
	.right{
		color: $color-nine;
		font-size: .32rem;
	}
}
</style>