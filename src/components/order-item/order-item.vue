<template>

  <view class="order-item">
    <view class="top-right-box"> 
        <!-- 待揽收 -->
        <view v-if="0" class="get-num">
            <text class="info-title">取件码</text>
            <text class="info-text">34567</text>
        </view>
        <!-- 待处理 -->
        <view v-if="0" class="info-cancel">
            <text class="info-text">已取消</text>
        </view>
        <view v-if="0" class="info-btn he-xiang">
            <text class="info-text">可合箱</text>
        </view>
        <view class="info-btn kefu">
            <text class="info-kefu-text">需要客服处理</text>
        </view>
        <!-- 已签收 -->
        <view class="info-btn qian-shou">
            <text class="info-qianshou-text">成功签收</text>
        </view>
        <view class="info-btn zi-ti">
            <text class="info-ziti-text">到达自提点</text>
        </view>
    </view>
    <view class="orderinfo-item">
      <text class="item-lab">运单号:</text>
      <text class="item-val">123214123121</text>
    </view>
    <view class="orderinfo-item">
      <text class="item-lab">国内快递单号:</text>
      <text class="item-val">123214123121</text>
    </view>
    <view class="orderinfo-item">
      <text class="item-lab">寄件人:</text>
      <text class="item-val">大表格</text>
    </view>
    <view class="address-info">
      <text class="address-from">广东深圳</text>
      <view class="address-icon">
        <text class="text">单独寄送</text>
      </view>
      <view class="address-to">
        <text class="address-to-text">美国纽约</text>
        <text class="address-to-remark">(自提点自提)</text>
      </view>
    </view>
    <view class="bottom-data">
      <text class="bottom-data-title">下单时间</text>
      <text class="data-text">2021-05-12</text>
      <text class="time-text">20:23</text>
      <text class="change-btn">更改</text>
    </view>
    <view class="bottom-data lanshou">
      <text class="bottom-data-title">预计揽收时间</text>
      <text class="data-text">2021-05-12</text>
      <text class="time-text">20:23</text>
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
    return {};
  },
  mounted() {
    console.log(this.item);
  },
  methods: {},
};
</script>
<style lang="scss">
.order-item {
  position: relative;
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
      .address-to-text {
        display: block;
        height: 50rpx;
        text-align: center;
      }
      .address-to-remark {
        display: block;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #7b7b7b;
        font-weight: 400;
      }
    }
    .address-icon {
      display: block;
      width: 194rpx;
      height: 50rpx;
      background: url(@/static/orderlist-address-icon.png) no-repeat center;
      background-size: 194rpx 20rpx;
      .text {
        display: block;
        width: 100%;
        margin-top: 48rpx;
        font-size: 24rpx;
        font-weight: bold;
        color: #000;
        text-align: center;
        line-height: 34rpx;
      }
    }
  }
  .bottom-data {
    display: flex;
    position: relative;
    margin-top: 20rpx;
    padding-top: 18rpx;
    border-top: 2rpx dashed #b1afaf;
    font-size: 28rpx;
    color: #000;
    line-height: 40rpx;
    align-items: center;
    font-weight: bold;
    .bottom-data-title {
      margin-right: 20rpx;
    }
    .time-text {
      margin-left: 18rpx;
    }
    .change-btn{
        display: flex;
        position: absolute;
        top: 18rpx;
        right: 0;
        width: 120rpx;
        height: 52rpx;
        font-size: 28rpx;
        color: #000;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        border-radius: 30rpx;
        border: 2rpx solid #000;
    }
    &.lanshou {
      .data-text,
      .time-text {
        font-size: 36rpx;
      }
    }

  }
  .top-right-box{
      display: block;
      position: absolute;
      top: 30rpx;
      right: 0;
    .get-num{
        padding-right: 28rpx;
        font-weight: 600;
        text-align: center;
        .info-title{
            display:block;
            font-size: 28rpx;
            color: #000;
            line-height: 40rpx;
        }
        .info-text{
            display: block;
            margin-top: 2rpx;
            font-size: 48rpx;
            color: #015AD7;
            line-height: 66rpx;
        }
    }
    .info-cancel{
        padding-right: 30rpx;
        font-weight: 600;
        color: #7B7B7B;
        font-size: 28rpx;
    }
    .info-btn{
        display: flex;
        height: 52rpx;
        margin-right: 30rpx;
        font-weight: 600;
        color: #fff;
        font-size: 24rpx;
        align-items: center;
        justify-content: center;
        border-radius: 30rpx;
        &.he-xiang{
            width: 120rpx;
            height: 52rpx;
            background-color: #2CB241;
        }
        &.kefu{
            height: 52rpx;
            padding: 0 12rpx;
            background-color: #FF0000;
        }
        &.qian-shou{
            margin: 0;
            padding: 0 30rpx;
            background-color: #2CB241;
            border-radius: 30rpx 0 0 30rpx;
        }
        &.zi-ti{
            margin: 0;
            padding: 0 30rpx;
            border-radius: 30rpx 0 0 30rpx;
            background-color: #FF0000;
        }
    }
  }
}
</style>