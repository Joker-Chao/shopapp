<template>
	<div>
		<detail-header></detail-header>
	</div>
</template>

<script>
	import DetailHeader from './Header'
	export default{
		props:{
			id: Number
		},
		data(){
			return {
				comment: {},
				gallery:[],
				goods: {}
			}
		},
		mounted(){
			this.getGoods()
		},
		methods:{
			getGoods(){
				this.axios.get(`api/goods?goods_id=${this.id}`).then(result => {
					const {comment:commentList,commentTotal,gallery,goods} = result
					this.comment = {
						list: commentList,
						count: commentTotal,
					}
					this.gallery = gallery
					this.goods = goods
					console.log(result)
				}).catch(err => {
					console.log(err)
					this.$router.replace('/goods-error')
				})
			}
		}
	}
</script>

<style>
</style>
