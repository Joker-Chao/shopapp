<template>
	<div class="cart-count">
		<div class="check-all">
			<input type="checkbox" class="checkbox" {selectAll ? 'checked' : ''} onclick="toggleSelectAll(${selectAll})"> ${selectAll? '全不选':'全选'}
		</div>
		<div class="price-total">
			合计：<span>{{totalPrice.toFixed(2)}}</span>
		</div>
		<div class="settle" onclick="submitCart()">去结算<span>(${cartNum})</span></div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
	.cart-count{
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		background-color: $color-white;
		border-top: 1px solid #CCCCCC;
		box-sizing: border-box;
		@include layout-flex($justify:space-between);
		font-size: .32rem;
		.check-all{
			width: 1.8rem;
			padding-left: .2rem;
			height: 100%;
			.checkbox{
				margin-right: .1rem;
			}
		}
		.price-total{
			flex: 1;
			span{
				color: $color-global;
				font-weight: 700;
			}
		}
		.settle{
			width: 2.17rem;
			height: 100%;
			background-color: $color-global;
			text-align: center;
			color: $color-white;
		}
	}
</style>
