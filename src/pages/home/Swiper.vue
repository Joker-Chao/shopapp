<template>
	 <swiper ref="mySwiper" :options="swiperOptions" class="swiper-container">
	    <swiper-slide v-for="item of swiperList" :key="item">
			<img :data-src="item" alt="" class="swiper-lazy swiper-img">
			<div class="swiper-lazy-preloader"></div>
		</swiper-slide>
	    <div class="swiper-pagination" slot="pagination"></div>
	  </swiper>
</template>

<script>
	import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
	
	export default {
		props:{
			swiperList: Array
		},
		components: {
			Swiper,
			SwiperSlide
		},
		data(){
			return {
				swiperOptions: {
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay:true,
					loop : true,
					lazy: {
						loadPrevNext: true
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.swiper-container{
	    width: 100%;
	    height: 3rem;
		img{
		    width: 100%;
		    height: 100%;
		}
		/deep/ .swiper-pagination-bullet{
			opacity: .5;
		}
		/deep/ .swiper-pagination-bullet-active{
			opacity: 1;
		  background: #fff;
		}
	}
</style>
