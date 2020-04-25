<template>
	<div class="page">
		<common-header :title="'购物车'"></common-header>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import CommonHeader from '@/components/Header';
	import CommonFooter from '@/components/Footer';
	
	export default{
		components:{
			CommonHeader,
			CommonFooter
		}
	}
</script>

<style>
</style>
