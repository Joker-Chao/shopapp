<template>
	<div id="header">
		<span class="iconfont back" v-if="back" @click="toBack">&#xe62f;</span>
		<h3>{{title}}</h3>
		<span class="iconfont cart" v-if="cartIconBtn" @click="toCart">&#xe60c;</span>
		<span class="cart manage" v-else-if="manageBtn" @click="toManage">管理</span>
		<span class="cart manage" v-else-if="accomplishBtn" @click="toManage">完成</span>
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type: String,
				default:'QianQian左右鞋包'
			},
			back: {
				type: String,
				default: ''
			},
			cartIcon: {
				type: Boolean,
				default: false
			},
			manage: {
				type: Boolean,
				default: false
			},
			accomplish: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				cartIconBtn: this.cartIcon,
				manageBtn: this.manage,
				accomplishBtn: this.accomplish
			}
		},
		watch:{
			back(){
				return this.back !== ''
			}	
		},
		methods:{
			toBack(){
				if(this.back === ''){
					this.$router.push('/')
				}else{
					// console.log(this.$route.path) 
					// if(this.$route.path === '/login' || this.$route.path === '/register'){
					// 	this.$router.replace(this.back)
					// }else{
						this.$router.push(this.back)
					// }
				}
			},
			toCart(){
				if(this.cartIcon !== ''){
					this.$router.push('/cart')
				}
				
			},
			toManage(){
				this.manageBtn = this.accomplishBtn
				this.accomplishBtn = !this.manageBtn
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  "~@/assets/scss/global";
	#header{
	    width: 100%;
	    height: $header-h;
		background-color: $color-global;
	    text-align: center;
	    font-size: 0.36rem;
	    line-height: $header-h;
	    color: $color-white;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		h3{font-weight: 600;}
		.back{
			display: block;
			width: 1rem;
			height: 100%;
			position: absolute;
			left: .2rem;
			top: 0;
			font-size: .4rem;
			text-align: left;
		}
	}
	.cart{
		height: 100%;
		position: absolute;
		top: 50%;
		right: 0.35rem;
		transform: translateY(-50%);
		font-size: 0.38rem;
		i{
			width: .3rem;
			height: .3rem;
			border-radius: 50%;
			position: absolute;
			top: 0.08rem;
			right: -0.15rem;
			background-color: $color-white;
			font-size: .2rem;
			line-height: .3rem;
			text-align: center;
			color: $color-global;
		}
		&.manage{
			font-size: 0.32rem;
			color: $color-white;
		}
	}
	
</style>
