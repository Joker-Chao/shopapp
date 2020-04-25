import { formatPrice } from '@/utils/function';

const filters = {
	filters:{
		formatPrice(price){
			return formatPrice(price)
		}
	}
}

export {
	filters
}