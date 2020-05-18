<template>
<div class="header-container">
	<span class="iconfont back" @click="toBack">&#xe62f;</span>
	<div class="input-bar">
		<input type="text" placeholder="请输入关键词" v-model="keyword">
		<span class="iconfont clear" v-show="keyword !== ''" @click="keyword=''">&#xe61a;</span>
	</div>
	<span class="search-btn" @click="search()">搜索</span>
	<ul class="quick-search" v-show="keyword !== ''">
		<li class="quik-search-item" v-for="item of quickSearch" :key="item" @click="search(item)">{{item}}</li>
	</ul>
</div>
</template>

<script>
export default{
	props:{
		query: String
	},
	data(){
		return{
			keyword: '',
			quickSearch: []
		}
	},
	watch:{
		keyword(){
			this.getQuickSearch()
		},
		query (val) {
		  if (val !== '') {
		    this.keyword = val
		  }
		}
	},
	methods:{
		search(keyword = null){
			if(keyword === null){
				keyword = this.keyword
			}
			this.$emit('search', keyword)
		},
		toBack(){
			this.$router.replace('/')
		},
		getQuickSearch(){
			if(this.keyword === ''){
				this.quickSearch = []
				return
			}
			this.$showLoading()
			this.axios.get('shose/search/quick',{
				params:{
					keyword: this.keyword
				}
			}).then(res => {
				this.quickSearch = res.list
			}).catch(err => {
				this.$showToast({
				    message: err.message
				})
			}).finally(() => {
				this.$hideLoading()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header-container{
	width: 100%;
	height: .88rem;
	padding: 0 .2rem;
	@include layout-flex;
	box-sizing: border-box;
	position: relative;
	.back{
		display: block;
		width: .6rem;
		height: .6rem;
		@include layout-flex($justify: flex-start);
		font-size: .4rem;
	}
	.input-bar{
		width: 0;
		flex: 1;
		height: .6rem;
		border-radius: .3rem;
		border: 1px solid #f1f1f1;
		background-color: #f3f4f5;
		font-size: .24rem;
		@include layout-flex($justify:space-between);
		input{
			width: 80%;
			height: 100%;
			border: none;
			border-radius: .3rem;
			text-indent: .2rem;
			background: transparent;
		}
		.clear{
			width: 20%;
			height: 100%;
			padding: .3rem;
			box-sizing: border-box;
			border-radius: .3rem;
			@include layout-flex($justify: flex-end);
			font-size: .32rem;
			color: $color-global;
		}
	}
	.search-btn{
		width: .8rem;
		height: .6rem;
		@include layout-flex($justify: flex-end);
		font-size: .24rem;
	}
	.quick-search{
		width: 100%;
		height: 100%;
		background-color: $color-white;
		position: fixed;
		left: 0;
		top: .88rem;
		padding: 0 .2rem;
		box-sizing: border-box;
		.quik-search-item{
			width: 100%;
			height: 1rem;
			@include layout-flex($justify:flex-start);
			font-size: .24rem;
		}
	}
}
</style>
