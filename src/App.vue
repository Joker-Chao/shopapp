<!--
 @Descripttion: 项目入口
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
	// import HomeHeader from '@pages/home/header'
	// 适配窗口
	document.addEventListener('DOMContentLoaded', () => {
	    const html = document.querySelector('html')
	    const fontSize = window.innerWidth / 7.5
	    // fontSize = fontSize > 50 ? 50 : fontSize
	    html.style.fontSize = fontSize + 'px'
	})
	export default{
		components:{
			
		}
	}
</script>

<style lang="scss">
	@import './assets/scss/reset';
	@import './assets/scss/border';
	@import './assets/scss/iconfont';
</style>
