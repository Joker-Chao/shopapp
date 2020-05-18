<template>
<div>
	<search-header @search="search" :query="keyword"></search-header>
	<div class="search-history" v-if="history.length > 0">
		<div class="menu">
			<span>最新搜索</span>
			<a href="javascript:" @click="clearHistory">清空</a>
		</div>
		<div class="history-list">
			<div class="history-item" v-for="item of history" :key="item" @click="search(item)">{{item}}</div>
		</div>
	</div>
	<div class="search-history" v-if="hotSearch.length > 0">
		<div class="menu">
			<span>最新搜索</span>
		</div>
		<div class="history-list">
			<div class="history-item" :class="{active: index < 3}" v-for="(item,index) of hotSearch" :key="index" @click="search(item)">{{item}}</div>
		</div>
	</div>
</div>
</template>

<script>
import SearchHistory from '@/utils/searchHistory'
import SearchHeader from './Header'
export default{
	components:{
		SearchHeader
	},
	data(){
		return{
			keyword: '',
			history: [],
			hotSearch: []
		}
	},
	mounted(){
		this.keyword = this.$route.query.q || ''
		this.history = SearchHistory.getHistory()
		this.getHotSearch()
	},
	methods:{
		search(keyword = null){
			if(keyword === ''){
				return
			}
			SearchHistory.setHistory(keyword)
			this.$router.push('/searchlist?q=' + keyword)
		},
		clearHistory(){
			SearchHistory.clearHistory()
			this.history = []
		},
		async getHotSearch(){
			this.$showLoading()
			this.hotSearch = await this.axios.get('shose/search/hot').then(res => res.list)
			this.$hideLoading()
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.search-history{
	width: 100%;
	padding: 0 .2rem;
	box-sizing: border-box;
	margin-top: .2rem;
	.menu{
		width: 100%;
		height: .6rem;
		@include layout-flex($justify: space-between);
		font-size: .24rem;
		a{
			color: $color-nine;
		}
	}
	.history-list{
		width: 100%;
		margin-top: .2rem;
		flex-wrap: wrap;
		@include layout-flex($justify: flex-start);
		.history-item{
			max-width: 100%;
			max-height: .56rem;
			height: .56rem;
			line-height: .56rem;
			color: #5d78ab;
			font-size: .24rem;
			padding: 0 .2rem;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			margin: .13333rem .13333rem .16rem 0;
			border: 1px solid #5d78ab;
			border-radius: .06rem;
			&.active{
			  color: #e4007f;
			  border-color: #f7add6;
			}
		}
	}
}	
</style>
