<!--
 @Descripttion: 项目入口
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
	// 适配窗口
	// document.addEventListener('DOMContentLoaded', () => {
	//     const html = document.querySelector('html')
	//     const fontSize = window.innerWidth / 7.5
	//     // fontSize = fontSize > 50 ? 50 : fontSize
	//     html.style.fontSize = fontSize + 'px'
	// })
	function resize(doc,win){
		const docEl = doc.documentElement
		const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
		const recalc = function() {
			const clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize =  clientWidth / 7.5 + 'px';
		};
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	}
	resize(document,window)
	
	export default{}
</script>

<style lang="scss">
	@import './assets/scss/reset';
	@import './assets/scss/border';
	@import './assets/scss/iconfont';
</style>
