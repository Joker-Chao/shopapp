<template>
<div class="page">
	<common-header title="选择地址" :back="backUrl"></common-header>
	<div class="address-list">
		<div class="address-item border-bottom" :class="{selected: item.selected}" v-for="item of address" :key="item.id" @click="chooseAddress(item.id)">
			<div class="address-content">
				<div class="address-name">
					<span>收货人: {{item.name}}</span>
					<span>{{item.phone}}</span>
				</div>
				<div class="address-detail">
				  收货地址: {{item.detail}}
				</div>
			</div>
			<span class="iconfont">&#xe650;</span>
		</div>
	</div>
	<div class="add-address" v-if="showAddAddress" @click="$router.push(`/user/add-address?url=${backUrl}`)">添加新地址</div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from "@/utils/token"
import {LocalStorage} from "@/utils/storage"
const MAX_ADDRESS_NUM = 10
export default{
	components: {
		CommonHeader
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			vm.backUrl = to.query.url || from.path
			vm.addressId = parseInt(to.query.id)
		})
	},
	data(){
		return {
			backUrl: '',
			addressId: 0,
			address: [],
			showAddAddress: true,
		}
	},
	mounted(){
		this.getUserAddress()
	},
	methods: {
		chooseAddress(selectAddressId){
			const index = this.address.findIndex(item => item.id === selectAddressId)
			if(index > -1){
				LocalStorage.setItem('address',this.address[index])
				this.$router.replace('/order')
			}
		},
		async getUserAddress(){
			this.$showLoading()
			const USER_TOKEN = Token.getToken()
			this.address = await this.axios.get('shose/address',{
				headers: {
					token: USER_TOKEN
				}
			}).then(res => res.address.map(item => {
				item.detail = `${item.province} ${item.city} ${item.area} ${item.address}`
				item.selected = item.id === this.addressId
				return item
			}))
			this.showAddAddress = (MAX_ADDRESS_NUM - this.address.length) > 0
			this.$hideLoading()
		}
	}
}  
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
	width: 100%;
	height: 100%;
	padding: $header-h 0 .3rem;
	box-sizing: border-box;
	background: $color-bg;
	.add-address{
		width: 100%;
		height: .9rem;
		background: $color-global;
		color:$color-white;
		font-size: .36rem;
		@include layout-flex;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.address-list{
		width: 100%;
		margin-top: .2rem;
		.address-item{
			width: 100%;
			height: 1.48rem;
			background: $color-white;
			padding: .25rem;
			margin-top: .1rem;
			box-sizing: border-box;
			@include layout-flex;
			&.selected{
				background: #5e6b85;
				.address-content{
					color: $color-white;
				}
			}
			.address-content{
				width: 0;
				flex: 1;
				margin-right: .2rem;
				.address-name{
					@include layout-flex($justify: space-between);
					height: .42rem;
					font-size: .32rem;
					padding-right:.2rem;
					box-sizing: border-box;
				}
				.address-detail{
					font-size: .24rem;
					margin-top: .1rem;
					line-height: 1.5em;
				}
			}
			.iconfont{
				color: $color-white;
				font-size: .4rem;
				@include layout-flex;
				width: .5rem;
				height: 100%;
			}
			
		}
	}
}
</style>