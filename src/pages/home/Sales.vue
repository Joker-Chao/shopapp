<template>
	<container title="特惠清仓" morePath="/goods-list">
		<template v-slot:content v-if="show">
			<swiper :options="swiperOptions" class="swiper-container" v-if="show">
				<swiper-slide v-for="(item,index) of pages" :key="index">
					<router-link tag="div" to="`goods-detail/${item.id}`" class="swiper-page">
						<div class="swiper-goods border" v-for="val of item" :key="val.id">
							<img :src="val.img" alt="" class="goods-img">
							<div class="goods-info">
								<div class="goods-name">{{val.name}}</div>
								<div class="goods-price">￥{{val.price|formatPrice}}</div>
							</div>
						</div>
					</router-link>
				</swiper-slide>
			   <div class="swiper-pagination" slot="pagination"></div>
			 </swiper>
		</template>
	</container>
</template>

<script>
	import { Swiper, SwiperSlide} from 'vue-awesome-swiper';
	import 'swiper/css/swiper.css';
	import { filters } from '@/utils/mixins';
	import Container from './Container';
	
	export default{
		props:{
			salesList: Array
		},
		components:{
			Container,
			Swiper,
			SwiperSlide
		},
		computed:{
			show(){
				return !!this.salesList.length;
			}
		},
		watch:{
			salesList(newList){
				const pages = [];
				newList.forEach((val,index) => {
					let page = Math.floor(index / 2);
					if(!pages[page]){
						pages[page] = [];
					}
					pages[page].push(val);
				})
				this.pages = pages;
				// console.log(this.pages)
			}
		},
		data(){
			return {
				pages: [],
				swiperOptions: {
					pagination: {
						el: '.swiper-pagination'
					}
				}
			}
		},
		mixins:[filters]
	}
</script>

<style lang="scss" scoped>
	@import "~@/assets/scss/global";
	.swiper-container{
		width: 100%;
		height: 4.4rem;
		margin-top: .2rem;
		.swiper-page{
			width: 100%;
			height: 4rem;
			@include layout-flex($justify:space-between);
			.swiper-goods{
				width: 3.44rem;
				height: 100%;
				border-radius: .2rem;
				overflow: hidden;
				@include layout-flex(column);
				.goods-img{
					width: 100%;
					height: 2.66rem;
				}
				.goods-info{
					height: 0;
					flex: 1;
					width: 90%;
					margin: .1rem 0 .2rem;
					@include layout-flex(column, space-between, flex-start);
					.goods-name{
						width: 100%;
						height: .3rem;
						line-height: .3rem;
						font-size: .2rem;
						color: $color-six;
						@include layout-ellipsis;
						font-weight: 600;
					}
					.goods-price{
						font-weight: 600;
						font-size: .28rem;
						color: $color-global;
					}
				}
			}
		}
		/deep/ .swiper-pagination-bullet-active{
			background: $color-global;
		}
		/deep/ .swiper-pagination-bullets {
			bottom: 0px;
		}
	}
</style>
