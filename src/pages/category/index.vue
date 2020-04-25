<template>
	<div class="page">
		<comment-header :title="'分类'" :back="backUrl"></comment-header>
		<search-bar></search-bar>
		<div class="content">
			<div class="content-left">
				<category :category="category" @change="loadSubCatgory"></category>
			</div>
			<div class="content-right">
				<sub-category :subCategory="subCategory"></sub-category>
			</div>
		</div>
		<comment-footer></comment-footer>
	</div>
</template>

<script>
	import CommentHeader from '@/components/Header';
	import SearchBar from '@/components/SearchBar';
	import CommentFooter from '@/components/Footer';
	import Category from './Category';
	import SubCategory from './SubCategory';
	
	export default{
		components:{
			CommentHeader,
			SearchBar,
			CommentFooter,
			Category,
			SubCategory
		},
		data(){
			return {
				backUrl: '',
				category: [],
				subCategory: []
			}
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
				vm.backUrl = from.path
			})
		},
		mounted(){
			this.getCategory()
		},
		methods:{
			//获得一级分类
			async getCategory(){
				this.$showLoading()
				const category = await this.axios.get('api/goods_category?type=1');
				this.$hideLoading()
				if(category.length > 0){
					this.category = category;
					this.getSubCategory(category[0].cat_id);
				}
			},
			//获得二级分类
			async getSubCategory(catId){
				this.$showLoading()
				this.subCategory = await this.axios.get('api/goods_category?type=1&cat_id=' + catId)
				this.$hideLoading()
			},
			loadSubCatgory(catId){
				this.getSubCategory(catId);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  margin-top: $header-h + $search-h;
}
.content{
  width: 100%;
  height: 100%;
  @include layout-flex;
  .content-left{
    width: 2rem;
    height: 100%;
    background-color: $color-bg;
  }
  .content-right{
    width: 0;
    flex: 1;
  }
}
</style>
