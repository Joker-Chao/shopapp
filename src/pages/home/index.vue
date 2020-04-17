<template>
	<div>
		<comment-header></comment-header>
		<search-bar></search-bar>
		<swiper></swiper>
	</div>
</template>

<script>
	import CommentHeader from '@/components/Header'
	import SearchBar from '@/components/SearchBar'
	import Swiper from './Swiper'
	export default{
		components:{
			CommentHeader,
			SearchBar,
			Swiper
		}
	}
</script>

<style lang="scss" scoped>
	@import  "~@/assets/scss/global";
</style>
