<template>
	<transition name="fade">
		<div class="model-warpper" v-if="visible">
			<div class="model">
				<div class="title" v-if="title !== ''">{{title}}</div>
				<div class="content" v-if="content !== ''">{{content}}</div>
				<div class="opera">
					<span @click="cancelModel">{{btn[0]}}</span>
					<span @click="confirmModel">{{btn[1]}}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default{
		data(){
			return {
				visible: false,
				title: '',
				content: '',
				btn: ['取消','确定']
			}
		},
		methods:{
			cancelModel(){
				this.visible = false
				const result = {
					confirm: false,
					cancel: true
				}
				this.$emit('model',result)
			},
			confirmModel(){
				this.visible = false
				const result = {
					confirm: true,
					cancel: false
				}
				this.$emit('model',result)
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	@import "~@/assets/scss/global";
	.model-warpper{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0;
		left: 0;
		background-color: rbga(0,0,0,.3);
		z-index: 999;
		.model{
			min-width: 55%;
			max-width: 70%;
			min-height: 2.8rem;
			max-height: 5rem;
			background-color: $color-white;
			font-size: 0.26rem;
			box-shadow: 0.05rem 0.05rem 0.1rem #000;
			border: 1px solid #007AFF;
			box-sizing: border-box;
			border-radius: 0.2rem;
			overflow: hidden;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			display: flex;
			flex-direction: column;
			letter-spacing:.05rem;
			color: $color-three;
			.title{
				line-height: .65rem;
				text-align: center;
				font-size: .3rem;
				border-bottom: 1px solid $color-bg;
				position: relative;
			}
			.content{
				flex: 1;
				padding: .25rem .2rem;
				text-indent: 2em;
			}
			.opera{
				height: .6rem;
				border-top: 1px solid $color-bg;
				display: flex;
				line-height: .6rem;
				font-size: .28rem;
			}
			span{
				width: 50%;
				height: 100%;
				text-align: center;
				&+span{
					border-left: 1px solid $color-bg;
				}
			}
		}
	}
	.fade-enter-active,
	.fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter,
	.fade-leave-to {
	  opacity: 0;
	}
</style>
