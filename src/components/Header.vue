<template>
	<div id="header">
		<span class="iconfont back" v-if="back" onclick="toBack">&#xe62f;</span>
		<h3>{{title}}</h3>
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
				type: Boolean,
				default: false
			}
		},
		methods:{
			toBack(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  "~@/assets/scss/global";
	#header{
	    width: 100%;
	    height: 0.88rem;
	    background-color: $color-global;
	    position: relative;
	    text-align: center;
	    font-size: 0.36rem;
	    line-height: 0.88rem;
	    color: #ffffff;
		h3{font-weight: 600;}
		.back{
		    position: absolute;
		    top: 50%;
		    left: 0.2rem;
		    transform: translateY(-50%);
		    font-size: 0.38rem;
			text-align: left;
		}
	}
</style>
