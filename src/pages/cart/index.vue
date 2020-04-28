<template>
	<div class="page">
		<common-header :title="'购物车'" :back="backUrl" :manage="true"></common-header>
		<cart-list :cart="cart"></cart-list>
		
		<common-footer></common-footer>
	</div>
</template>

<script>
	import CommonHeader from '@/components/Header';
	import CommonFooter from '@/components/Footer';
	import cartList from './CartList';
	// import Count from './Count';
	import { LocalStorage } from '@/utils/storage';
	
	export default{
		components:{
			CommonHeader,
			CommonFooter,
			cartList
		},
		beforeRouteEnter(to,from,next){
			next(vm => {
				vm.backUrl = from.path 
			}) 
		},
		data(){
			return{
				backUrl: '',
				cart: []
			}
		},
		mounted(){
			const cart = LocalStorage.getItem('cart') || []
			if(cart.length > 0){
				this.cart = cart.map(item => {
					if(!Reflect.has(item,'delete')){
						item.delete = false
					}
					return item
				})
			}
			console.log(this.cart)
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
}
</style>
