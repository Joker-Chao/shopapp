<template>
	<div id="header">
		<span class="iconfont back" v-if="back" @click="toBack">&#xe62f;</span>
		<h3>{{title}}</h3>
		<span class="iconfont cart" v-if="cart" @click="toCart">&#xe60c;<!-- <i>2</i> --></span>
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
			cart: {
				type: Boolean,
				default: false
			}
		},
		watch:{
			back(){
				return this.back !== ''
			},
			cart(){
				return this.cart !== ''
			}
		},
		methods:{
			toBack(){
				if(this.back === ''){
					this.$router.push('/')
				}else{
					this.$router.push(this.back)
				}
			},
			toCart(res){
				if(this.cart !== ''){
					this.$router.push('/cart')
					this.cart = res
				}
				
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
			background-color: #FFFFFF;
			font-size: .2rem;
			line-height: .3rem;
			text-align: center;
			color: #FF5E46;
		}
	}
</style>
