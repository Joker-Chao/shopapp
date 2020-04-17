<template>
	<div>
		<comment-header></comment-header>
		<search-bar></search-bar>
		<swiper :swiperList="swiperList"></swiper>
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
		},
		data(){
			return{
				swiperList: [
				'https://img.alicdn.com/imgextra/i1/22/O1CN01EnqAzo1C27JF8tsF5_!!22-0-luban.jpg',
				'https://gw.alicdn.com/imgextra/i2/45/O1CN01MyEDlt1CCePyZnYUk_!!45-0-lubanu.jpg',
				'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'
				]
			}
		},
		mounted(){
			this.getSwiper()
		},
		methods:{
			getSwiper(){
				this.axios.get('api/swiper').then(res => {
					console.log(res);
				}).then(rej => {
					console.log(rej);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  "~@/assets/scss/global";
</style>
