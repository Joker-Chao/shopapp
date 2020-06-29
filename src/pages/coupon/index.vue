<template>
<div class="page">
    <common-header title="优惠券" :back="backUrl"></common-header>
    <div class="user-points">
        <div class="title">当前积分</div>
        <div class="points">{{points}}</div>
    </div>
    <div class="coupon-list">
        <div v-for="item of couponList" :key="item.id" class="coupon-item">
            <div class="coupon-money">
                ￥<span class="money">{{item.money|formatPrice}}</span>
            </div>
            <div class="coupon-desc">
                <div class="coupon-name">{{item.money|formatPrice}}元优惠券</div>
                <div class="coupon-time">有效期到{{item.time|handleTime}}</div>
                <div class="coupon-condition">{{item.limit_total > 0 ? `订单满${item.limit_total}元可用`: '无门槛使用'}}</div>
                <div class="coupon-points" v-show="item.points > 0">{{item.points}}积分</div>
            </div>
            <div class="exchange" :class="{'not-exchange': !item.canExchange}" @click="exchange(item.id)">{{item.text}}</div>
        </div>
    </div>
</div>
</template>

<script>
import CommonHeader from "@/components/Header"
import {Token} from "@/utils/token"
import {LocalStorage} from "@/utils/storage"
import {filters} from "@/utils/mixins"
import {dateFormat, formatPrice} from "@/utils/function"

export default{
    components: {
        CommonHeader
    },
    mixins: [filters],
    filters:{
        handleTime(days){
            const time = Date.now() + days * 24 * 3600 * 1000
            return dateFormat('YYYY.mm.dd',new Date(time))
        }
    },
    data () {
        return {
            backUrl: '',
            couponList: [],
            points: 0
        }
    },
    async mounted(){
        this.$showLoading();
        this.backUrl = this.$route.query.url || '/'
        await this.getUserPoints()
        await this.getCouponList()
        this.$hideLoading();
    },
    methods:{
        async getCouponList(){
            const couponList = await this.axios.get('shose/coupon')
            this.couponList = couponList.map(item => {
                if(item.is_use === 1){
                    item.limit_total = formatPrice(item.limit_total)
                    let text = ''
                    let canExchange = true
                    if(item.points === 0){
                        text = '立即领取'
                    }else{
                        if(item.points > this.points){
                            text = '积分不足'
                            canExchange = false
                        }else{
                            text = '立即兑换'
                        }
                    }
                    item.text = text 
                    item.canExchange = canExchange
                    return item
                }
            })
        },
        async getUserPoints(){
			const USER_TOKEN = Token.getToken()
            this.points = await this.axios.get('shose/user-points',{
                headers:{
                    token: USER_TOKEN
                }
            }).then(res => res.points)
        },
        exchange(couponId){
            const index = this.couponList.findIndex(item => item.id === couponId)
            if(index > -1){
                const coupon = this.couponList[index]
                if(coupon.points >0 && coupon.points > this.points){
                    this.$showToast({
                        message: '积分不足'
                    })
                    return
                }
                this.$showLoading()
				const USER_TOKEN = Token.getToken()
                this.axios.post('shose/coupon/get',{
                    coupon_id : couponId
                },{
                    headers: {
                        token: USER_TOKEN
                    }
                }).then(() => {
                    this.$showToast({
                        message: '兑换成功'
                    })
                    LocalStorage.deleteItem('userCoupon')
                }).catch(err => {
                    this.$showToast({
                        message: err.message || '兑换失败'
                    })
                }).finally(() => {
                    this.$hideLoading()
                })
            }
        }
    }
}  
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
    width: 100%;
    min-height: 100%;
    margin-top: $header-h;
    .user-points{
        width: 100%;
        height: 1.6rem;
        .title{
            width: 100%;
            line-height: .7rem;
            text-align: center;
            color: $color-six;
            font-size: .32rem;
        }
        .points{
            width: 100%;
            line-height: .9rem;
            text-align: center;
            color: $color-global;
            font-size: .84rem;
            font-weight: 700;
        }
    }
    .coupon-list{
        width: 100%;
        height: auto;
        padding: 0 .2rem;
        box-sizing: border-box;
        margin-top: .9rem;
        .coupon-item{
            width: 100%;
            height: 1.4rem;
            margin-bottom: .2rem;
            @include layout-flex;
            position: relative;
            .exchange{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 1.4rem;
                height: .58rem;
                box-sizing: border-box;
                border: 1px solid $color-global;
                color: $color-global;
                border-radius: .3rem;
                @include layout-flex;
                font-size: .26;
                font-weight: 600;
                &.not-exchange{
                    color: $color-nine;
                    border-color: $color-nine;
                }
            }
            .coupon-money{
                width: 2.3rem;
                height: 100%;
                background-image: url("../../assets/images/exchange.png");
				background-size: contain;
				background-repeat: no-repeat;
                color: $color-white;
                @include layout-flex($align: baseline);
                line-height: 1.4rem;
                font-size: .5rem;
                .money{
                    font-size: .84rem;
                }
            }
            .coupon-desc{
                width: 0;
                height: 95%;
                flex: 1;
                margin-left: .2rem;
                @include layout-flex(column, space-between, flex-start);
                font-size: .28rem;
                color: $color-three;
                .coupon-points{
                    color: $color-global;
                }
            }
        }
    }
}
</style>