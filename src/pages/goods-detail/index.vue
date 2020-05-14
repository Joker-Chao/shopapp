<template>
<div>
	<detail-header :showIconMenu="showIconMenu" :scrollTab="scrollTab" :opacity="headerOpacity" @tab="changeTab"></detail-header>
	<div class="page" ref="page">
		<div>
			<div id="goods">
				<detail-gallery :gallery="gallery"></detail-gallery>
			</div>
			<detail-info :goods="goods"></detail-info>
			<div id="comment">
				 <detail-comment :goodsId="id" :commentList="commentList" :list="comment.list" :count="comment.count"></detail-comment>
      		</div>
			<div id="detail">
				<div class="title">
					<div class="cell">
						<hr>
					</div>
					<span>详情</span>
					<div class="cell">
						<hr>
					</div>
				</div>
				<div class="img" v-for="(item,index) of goods.content" :key="index">
					<img v-lazy="item">
				</div>
			</div>
		</div>
	</div>
	<div class="footer border-top">
    <div class="footer-left">
    	<div class="footer-cell" @click="$router.push('/')">
        	<span class="iconfont">&#xe606;</span> 
        	店铺
      	</div>
      	<div class="footer-cell">
        	<span class="iconfont">&#xe602;</span>
        	客服
      	</div>
      	<div class="footer-cell" :class="{collect: isCollect}" @click="collect">
        	<span class="iconfont">{{isCollect?'&#xe62b;':'&#xe63d;'}}</span>
        	{{isCollect?'已收藏':'收藏'}}
      	</div>
    	</div>
    	<div class="footer-right">
      		<div class="cart" @click="addToCart">加入购物车</div>
			<router-link tag="div" :to="`/order?loginRedirect=${encodeURIComponent('/goods-detail')}&id=${id}`" class="buy">立即购买</router-link>
    	</div>
  	</div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import DetailHeader from './Header'
import DetailGallery from './Gallery'
import DetailInfo from "./Info"
import DetailComment from "./Comment"
import { Token } from '@/utils/token'
import { LocalStorage } from '@/utils/storage'

export default{
	props:{
		id: Number
	},
	components:{
		DetailHeader,
		DetailGallery,
		DetailInfo,
		DetailComment
	},
	data(){
		return {
			isCollect: false,  
			showIconMenu: true,
			scrollTab: 'goods',
			headerOpacity: 0,
			comment: {},
			commentList: [],
			gallery:[],
			goods: {},
			scroll: null,
			scrollOptions: {
				startY: 0,
				click: true,
				scrollX: false,
				scrollY: true,
				// 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
				probeType: 3,
				scrollbar: false
			}
		}
	},
	mounted(){
		this.getGoods()
		this.initScroll()
		this.initCollect()	
		this.setHistory()
	},
	methods:{
		async initCollect(){
			const token = Token.getToken()
			if(token === ''){
				this.isCollect = false
				return 
			}
			this.axios.get('shose/collect/check',{
				params:{
					goods_id: this.id
				},
				headers:{
					token
				}
			}).then(res => {
				this.isCollect = res.collect === 1
			})
		},
		async setHistory(){
			const token = Token.getToken()
			if(token !== '' && this.id > 0){
				this.axios.post('shose/history/set',{goods_id: this.id},{
					hearders: {
						token
					}
				})
			}
		},
		async collect(){
			// 判断是否登录
			const token = Token.getToken()
			// 没有登录，则跳转至登录页面
			if(token === ''){
				const url = encodeURIComponent('/goods-detail/'+ this.id)
				this.$router.push(`/login?url=${url}`)
				return 
			} 
			// 已经登录，判断是收藏还是取消收藏
			let path = ''
			if (this.isCollect) {
				path = 'shose/collect/cancel'
			} else {
				path = 'shose/collect/confirm'
			}
			this.$showLoading()
			await this.axios.post(path, {goods_id: this.id}, {
				headers: {
					token
				}
			})
			this.$hideLoading()
			this.isCollect = !this.isCollect	 
		},
		addToCart () {
			if (this.id === 0) {
				return
			}
			this.$showModel({
				content: '是否加入购物车？',
				btn: ['否', '是'],
				success: res => {
					const goods = this.goods
					if(Object.keys(goods).length === 0){
						return
					}
					if (res.confirm) {
						const cart = LocalStorage.getItem('cart') || []
						const index = cart.findIndex(item => item.id === this.id)
						const cartData = {
							id: goods.goods_id,
							img: goods.goods_img,
							name: goods.goods_name,
							price: goods.goods_price
						}
						if (index === -1) {
							cartData.selected = true
							cartData.buyNumber = 1
							cart.push(cartData)
						} else {
							const buyNumber = cart[index].buyNumber
							const selected = cart[index].selected
							cart[index] = {
								...cartData,
								selected,
								buyNumber: 1 + buyNumber
							}
						}
						LocalStorage.setItem('cart',cart)
					}
				}
			})
    	},
		changeTab(tabName){
			this.scrollTab = tabName	
      		this.scroll.scrollToElement('#'+tabName, 1000, 0, -50)
			console.log('#'+tabName)
		},
		getGoods(){
			this.$showLoading()
			this.axios.get(`api/goods?goods_id=${this.id}`).then(result => {
				const {comment:commentList,commentTotal,gallery,goods} = result
				this.comment = {
					list: commentList,
					count: commentTotal,
				}
				this.commentList = commentList.slice(0,2)
				this.gallery = gallery
				this.goods = goods
			}).catch(err => {
				console.log(err)
				this.$router.replace('/goods-error')
			}).finally(() => {
				this.$hideLoading()
			})
		},
		initScroll () {
			this.$nextTick( () => {
				let bodyHeight = document.documentElement.offsetHeight
				let footerHeight = document.querySelector('.footer').offsetHeight
				this.$refs.page.style.height = bodyHeight - footerHeight + 'px'
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.page, this.scrollOptions)
				} else {
					this.scroll.refresh() // 重新属性BScroll状态
				}
				this.scroll.on('scroll', position => {
					const y = Math.abs(position.y)
					const headerOpacity = y / 150
					this.headerOpacity = headerOpacity > 1 ? 1 : headerOpacity
					if (y > 50) {
						this.showIconMenu = false
					} else {
						this.showIconMenu = true
					}
				})
			})
		}
	}
}

</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
	width: 100%;
	height: 100%;
	background: $color-bg;
	overflow: hidden;
	.title{
		height: .8rem;
		padding: 0 30%;
		@include layout-flex;
		color: $color-six;
		.cell{
			width: 0;
			flex: 1;
		}
		span{
			padding: 0 .2rem;
		}
  	}
  	.img{
		width: 100%;
		height: auto;
		img{
			width: 100%;
		}
  	}
}
.footer{
	width: 100%;
	height: 1rem;
	position: fixed;
	left: 0;
	bottom: 0;
	background: $color-white;
	@include layout-flex;
	.footer-left{
		width: 0;
		flex: 1;
		height: 100%;
		@include layout-flex;
		color: $color-nine; 
		.footer-cell{
		width: 33.33%;
		@include layout-flex(column);
		font-size: .24rem;
		.iconfont{
			font-size: .3rem;
			margin-bottom: .1rem;
		}
		&.collect{
			color: #FF0036;
		}
		}
	}
	.footer-right{
		width: 4.5rem;
		height: 100%;
		@include layout-flex;
		background: $color-global;
		.buy,.cart{
			width: 50%;
			height: 100%;
			color: $color-white;
			@include layout-flex;
			font-size: .3rem;
		}
		.buy{
			background: #FF0036;
		}
	}
}
</style>
