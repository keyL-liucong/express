<template>
  <view class="order-item">
    <view class="orderinfo-item">
      <text class="item-lab">运单号:</text>
      <text class="item-val">123214123121</text>
    </view>
    <view class="orderinfo-item">
      <text class="item-lab">寄件人:</text>
      <text class="item-val">大表格</text>
    </view>
    <view class="address-info">
      <text class="address-from">广东深圳</text>
      <text class="address-icon"></text>
      <view class="address-to">
          <text class="address-to-text">美国纽约</text>
          <text class="address-to-remark">(自提点自提)</text>
    </view>
    </view>
  </view>
</template>


<script>
export default {
  name: "orderItem",
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      winWidth: 0,
      tabsWidth: 0,
      scrollLeft: 0,
    };
  },
  methods: {},
};
</script>
<style lang="scss">
.order-item {
  width: 690rpx;
  padding: 30rpx;
  border-radius: 20rpx;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  .orderinfo-item {
    display: flex;
    font-size: 28rpx;
    margin-bottom: 10rpx;
    align-items: center;
    .item-val {
      margin-left: 8rpx;
      color: #000;
    }
    .item-lab {
      color: #7b7b7b;
    }
  }
  .address-info {
    display: flex;
    padding-top: 10rpx;
    align-items: flex-start;
    font-size: 36rpx;
    color: #000;
    line-height: 50rpx;
    font-weight: bold;
    justify-content: space-between;
    .address-from {
      height: 50rpx;
    }
    .address-to {
      .address-to-text{
          display: block;
          height: 50rpx;
          text-align: center;
      }
      .address-to-remark{
          display: block;
          font-size: 28rpx;
          line-height: 40rpx;
          color: #7B7B7B;
          font-weight: 400;
      }
    }
    .address-icon {
        display: block;
        width: 194rpx;
        height: 50rpx;
        background: url(@/static/orderlist-address-icon.png) no-repeat center;
        background-size: 194rpx 20rpx;
    }
  }
}
</style>