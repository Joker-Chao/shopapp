<template>
	 <swiper ref="mySwiper" :options="swiperOptions">
	    <swiper-slide v-for="item of swiperList" :key="item">
			<img :src="item" alt="">
		</swiper-slide>
	    <div class="swiper-pagination" slot="pagination"></div>
	  </swiper>
</template>

<script>
	import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
	
	export default {
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
			loop : true
		  },
		  swiperList: [
			  'https://img.alicdn.com/imgextra/i1/22/O1CN01EnqAzo1C27JF8tsF5_!!22-0-luban.jpg',
			  'https://gw.alicdn.com/imgextra/i2/45/O1CN01MyEDlt1CCePyZnYUk_!!45-0-lubanu.jpg',
			  'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'
		  ]
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
