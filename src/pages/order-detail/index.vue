<template>
<div class="page" v-if="show">
	<common-header title="订单详情" back="/user/order"></common-header>
	<div class="order-status">
		<span class="iconfont">&#xe60b;</span>
		<span>买家{{order.statusInfo}}</span>
		<span>您的包裹已蓄势待发~</span>
	</div>
	<div class="address-container">
		<span class="iconfont position-icon">&#xe611;</span>
		<div class="address">
			<div class="address-detail">
				<div class="name">{{address.name}}<span>{{address.phone}}</span></div>
				<div class="address-content">{{addressContent}}</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style>
</style>
