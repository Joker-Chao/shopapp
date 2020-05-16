<template>
<div class="page">
	<common-header title="我的卡券" back="/user"></common-header>
	<template v-if="(couponOne.length>0)">
		<coupon-list :couponList="couponOne"></coupon-list>
	</template>
	<template v-if="(couponTwo.length>0)">
		<coupon-list :couponList="couponTwo"></coupon-list>
	</template>
	<template v-if="(couponThree.length>0)">
		<coupon-list :couponList="couponThree"></coupon-list>
	</template>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import CouponList from './couponList'
import {Token} from '@/utils/token.js'
import {dateFormat} from "@/utils/function"
export default{
	components:{
		CommonHeader,
		CouponList
	},
	data(){
		return {
			coupon: [],
			couponOne: [],
			couponTwo: [],
			couponThree: []
		}
	},
	mounted(){
		this.getUserCoupon()
	},
	methods:{
		async getUserCoupon(){
			const token = Token.getToken()
			const coupon = await this.axios.get('shose/coupon/get', {
				headers: {
					token
				}
			}).then(res => res.coupon)
			const statusOptions = ['','优惠抵扣','已经使用','已经失效']
			this.coupon = coupon.map(item => {
				let status = 0
				if(item.is_use === 1){
					status = 3
					this.couponThree.unshift(item)
				}else{
					if(Date.now() > item.expires_time * 1000){
						status = 2
						this.couponTwo.unshift(item)
					}else{
						status = 1
						this.couponOne.unshift(item)
					}
				}
				item.couponMoney = parseInt(item.money)
				item.statusText = statusOptions[status] || ''
				item.startTime = dateFormat('YYYY.mm.dd', new Date(item.get_time * 1000))
				item.endTime = dateFormat('YYYY.mm.dd', new Date(item.expires_time * 1000))
				item.status = status
				return item
			})
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
	box-sizing: border-box;
	background: $color-white;
}
</style>
