<template>
    <view class="app-container">
        <view class="coupon-part-list" v-if="couponList.length > 0">
             <view class="coupon-item " :class="[item.status != 3 ? 'use-item' : 'no-use-item']" v-for="(item,index) in couponList" :key="index">
                <view class="coupon-top">
                    <view class="money-num" v-if="item.coupon_type == 1">
                        <text>￥</text><text class="num">{{ item.money }}</text>
                    </view>
                    <view class="money-num" v-else>
                        <text class="num">{{ item. discount }}</text><text>折</text>
                    </view>
                    <view class="coupon-desc">
                        <view>{{ item.coupon_name }}</view>
                        <view>仅限国际线路使用</view>
                    </view>
                </view>
                <view class="coupon-bottom">
                    <view class="coupon-time"> 有效期：{{ item.end_time }}前 </view>
                    <view class="coupon-btn use-btn" v-if="item.status === 3"> 立即使用 </view>
                    <view class="coupon-btn no-use-btn" v-else-if="item.status === 2"> 已过期 </view>
                    <view class="coupon-btn no-use-btn" v-else-if="item.status === 1"> 已使用 </view>
                </view>
            </view>
            <!-- <view class="coupon-item use-item">
                <view class="coupon-top">
                    <view class="money-num">
                        <text>￥</text><text class="num">100</text>
                    </view>
                    <view class="coupon-desc">
                        <view>满200可使用</view>
                        <view>仅限国际线路使用</view>
                    </view>
                </view>
                <view class="coupon-bottom">
                    <view class="coupon-time"> 有效期：2021-06-13前 </view>
                    <view class="coupon-btn use-btn"> 立即使用 </view>
                </view>
            </view>
            <view class="coupon-item no-use-item">
                <view class="coupon-top">
                    <view class="money-num">
                        <text>￥</text><text class="num">100</text>
                    </view>
                    <view class="coupon-desc">
                        <view>满200可使用</view>
                        <view>仅限国际线路使用</view>
                    </view>
                </view>
                <view class="coupon-bottom">
                    <view class="coupon-time"> 有效期：2021-06-13前 </view>
                    <view class="coupon-btn no-use-btn"> 立即使用 </view>
                </view>
            </view>
            <view class="coupon-item use-item">
                <view class="coupon-top">
                    <view class="money-num">
                        <text>￥</text><text class="num">100</text>
                    </view>
                    <view class="coupon-desc">
                        <view>满200可使用</view>
                        <view>仅限国际线路使用</view>
                    </view>
                </view>
                <view class="coupon-bottom">
                    <view class="coupon-time"> 有效期：2021-06-13前 </view>
                    <view class="coupon-btn use-btn"> 立即使用 </view>
                </view>
            </view>
            <view class="coupon-item no-use-item">
                <view class="coupon-top">
                    <view class="money-num">
                        <text>￥</text><text class="num">100</text>
                    </view>
                    <view class="coupon-desc">
                        <view>满200可使用</view>
                        <view>仅限国际线路使用</view>
                    </view>
                </view>
                <view class="coupon-bottom">
                    <view class="coupon-time"> 有效期：2021-06-13前 </view>
                    <view class="coupon-btn no-use-btn"> 立即使用 </view>
                </view>
            </view> -->
        </view>
        <view v-else style="text-align:center;">
            暂无优惠券~
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            couponList:[]
        };
    },
    methods: {
        getCouponList(){
            this.$api.getCouponList()
        }
    },
    async created() {
        let res = await this.$api.getMyCounponList({page:1,size:10});
        if(res.data && res.data.list.length > 0) {
            this.couponList = res.data.list;
        }
        console.log(res);
    },
    mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
    background: #f3f3f3;
    padding: 40rpx 56rpx 0;
    .coupon-part-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .coupon-item {
            width: 640rpx;
            height: 103px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-bottom: 40rpx;
            .coupon-top {
                height: 66px;
                display: flex;
                align-items: center;
                color: #fff;
                font-size: 14px;
                .money-num {
                    width: 220rpx;
                    text-align: center;
                    .num {
                        font-size: 48rpx;
                        font-weight: bold;
                    }
                }
                .coupon-desc {
                    padding-left: 40rpx;
                }
            }
            .coupon-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                padding: 0 50rpx;
                font-size: 12px;
                .coupon-btn {
                    height: 40rpx;
                    line-height: 40rpx;
                    border-radius: 20rpx;
                    border: 1px solid;
                    padding: 0 7px;
                }
                .use-btn {
                    color: #fe5108;
                    border-color: #fe5108;
                }
                .no-use-btn {
                    color: #7b7b7b;
                    border-color: #7b7b7b;
                }
            }
        }
        .use-item {
            background-image: url("../../static/coupon-1.png");
        }
        .no-use-item {
            background-image: url("../../static/coupon-2.png");
        }
    }
}
</style>