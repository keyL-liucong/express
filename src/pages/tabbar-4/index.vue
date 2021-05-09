<template>
  <view class="app-container">
    <view class="rece-wrap">
      <view class="title">领券专区</view>
      <view class="coupon-part-list" v-if="couponList.length > 0">
        <view
          class="coupon-item"
          :class="[item.status != 3 ? 'use-item' : 'no-use-item']"
          v-for="(item, index) in couponList"
          :key="index"
        >
          <view class="coupon-top">
            <view class="money-num" v-if="item.coupon_type == 1">
              <text>￥</text><text class="num">{{ item.money }}</text>
            </view>
            <view class="money-num" v-else>
              <text class="num">{{ item.discount }}</text
              ><text>折</text>
            </view>
            <view class="coupon-desc">
              <view>{{ item.name }}</view>
              <view>仅限国际线路使用</view>
            </view>
          </view>
          <view class="coupon-bottom">
            <!-- <view class="coupon-time"> 有效期：{{ item.end_time }}前 </view> -->
            <view class="coupon-time">  </view>
            <view class="coupon-btn use-btn" v-if="item.status === 3">
              立即使用
            </view>
            <view class="coupon-btn no-use-btn" v-else-if="item.status === 2">
              已过期
            </view>
            <view class="coupon-btn no-use-btn" v-else-if="item.status === 1">
              已使用
            </view>
            <view class="coupon-btn use-btn" @click="handleRece(item.coupon_id)">立即领取</view>
          </view>
        </view>
      </view>
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
      async handleRece(coupon_id){
          let res = await this.$api.getCouponReceive({coupon_id});
          console.log(res);
          this.$toast(res.info);
      }
  },
 async created() {
      let res = await this.$api.getCouponList({page:1,size:30});
      console.log(res);
      this.couponList = res.data.list;
      console.log(res);
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
    background: #f3f3f3;
    min-height: 100vh;
    padding: 20rpx 26rpx 0;
  .rece-wrap {
      background: #fff;
      padding: 30rpx;
      border-radius: 16rpx;
      .title{
          margin-bottom: 20rpx;
      }
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
}
</style>