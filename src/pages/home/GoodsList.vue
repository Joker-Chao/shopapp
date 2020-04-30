<template>
	<container title="为你推荐">
		<template v-slot:content>
			<div class="goods-list">
				<router-link tag="div" to="`goods-detail/${item.id}`" class="goods-item border" v-for="item of goodsList" :key="item.id">
					<img v-lazy="item.img" alt="" class="goods-img">
					<div class="goods-info">
					  <div class="goods-name">{{item.name}}</div>
					  <div class="goods-price">￥{{item.price|formatPrice}}</div>
					</div>
				</router-link>
			</div>
		</template>
	</container>  
</template>

<script>
	import Container from './Container';
	import { filters } from '@/utils/mixins';
	
	export default{
		props:{
			goodsList: Array
		},
		mixins:[filters],
		components:{
			Container
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list{
  height: auto;
  margin-top: .2rem;
  @include layout-flex($justify:space-between);
  flex-wrap: wrap;
  .goods-item{
    width: 3.44rem;
    height: 4rem;
    border-radius: .1rem;
    @include layout-flex(column);
    overflow: hidden;
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
        @include  layout-ellipsis;
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
</style>
