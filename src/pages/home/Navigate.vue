<template>
	<div class="navigate-container">
		<div class="swiper-wrapper" id="navigate-list">
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped="scoped">
	.navigate-container{
	    width: 100%;
	    height: 3.87rem;
	    padding: 0 0.2rem;
	    box-sizing: border-box;
	    background-color: #ffffff;
		img{
		    width: 100%;
		    height: 100%;
		}
		.item{
		    display: flex;
		    flex-wrap: wrap;
			.cell{
			    width: 25%;
			    height: 50%;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    flex-direction: column;
				img{
				    width: 0.9rem;
				    height: 0.9rem;
				    margin-bottom: 0.2rem;
				}
			}
		}
	}
</style>
