<template>
	<div class="nav-container">
		<router-link get="div" :to="'/goods-list?cname=' + item.name" v-for="item of list" :key="item.id" class="nav-item">
			<img :src="item.img" class="nav-img" alt="">
			<span>{{item.name}}</span>
		</router-link>
	</div>
</template>

<script>
	export default{
		props:{
			navList: Array
		},
		watch: {
			navList (newList){
				if(newList.length > 8){
					this.list = newList.slice(-8)
				}else{
					this.list = newList
				}
			}
		},
		data() {
			return{
				list: []
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global';
	.nav-container{
	    width: 100%;
	    height: 3.9rem;
	    padding: .3rem 0.2rem;
	    box-sizing: border-box;
	    background-color: $color-white;
		display: flex;
		flex-wrap: wrap;
		.nav-item{
		    width: 25%;
		    height: 50%;
		    @include layout-flex($direction:column);
			color: $color-three;
			.nav-img{
			    width: 0.9rem;
			    height: 0.9rem;
			    margin-bottom: 0.2rem;
			}
		}
	}
</style>
