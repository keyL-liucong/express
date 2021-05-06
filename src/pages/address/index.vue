<template>
  <view class="app-container">
    <view class="tabs-box">
      <view class="tab-item active">收件地址簿</view>
      <view class="tab-item">寄件地址簿</view>
    </view>
    <view class="addr-content">
      <view class="addr-list">
        <radio-group color="#5677fc" :value="1">
          <view class="addr-itme">
            <view class="row">
              <text>jack kg</text>
              <text>13111111111</text>
            </view>
            <view class="row">**省**市**区</view>
            <view class="radio-row">
             <view class="left">
                <radio color="#5677fc" :value="1"></radio>
              <text class="thorui-left__sm">设置默认收件地址</text>
             </view>
             <view class="right">
               <text>编辑</text>
               <text>删除</text>
             </view>
            </view>
          </view>
           <view class="addr-itme">
            <view class="row">
              <text>jack kg</text>
              <text>13111111111</text>
            </view>
            <view class="row">**省**市**区</view>
            <view class="radio-row">
             <view class="left">
                <radio color="#5677fc" :value="1"></radio>
              <text class="thorui-left__sm">设置默认收件地址</text>
             </view>
             <view class="right">
               <text>编辑</text>
               <text>删除</text>
             </view>
            </view>
          </view>
        </radio-group>
      </view>
    </view>
    <view class="bottom-btn-box">
      <button @click="navTo('/pages/address/send')">新增收件地址</button>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      couponList: [],
    };
  },
  methods: {
    navTo(url) {
        this.$page.navigateTo({ url: url });
    }
  },
  async created() {},
  mounted() {
     
  },
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  .tabs-box {
    background: #fff;
    width: 100%;
    display: flex;
    padding-left: 20rpx;
    position: fixed;
    top: 0;
    .tab-item {
      height: 80rpx;
      line-height: 80rpx;
      padding: 4rpx 20rpx;
      margin-right: 30rpx;
    }
    .active {
      color: #3f81ff;
      border-bottom: 3px solid #3f81ff;
    }
  }
  .addr-content{
    padding: 20rpx;
    padding-top: 120rpx;
    .addr-list{
      height: calc(100vh - 60rpx);
      .addr-itme{
        // padding: 20rpx;
        padding-left: 20rpx;
        margin-bottom: 30rpx;
        background: #fff;
        border-radius: 16rpx;
        .row{
          height: 70rpx;
          line-height: 70rpx;
        }
        .radio-row{
          display: flex;
          justify-content: space-between;
          height: 80rpx;
          line-height: 80rpx;
          border-top: 1px solid #ccc;
          color: rgb(119, 113, 113);
         .right{
           text{
             margin-right: 20rpx;
           }
         }
        }
      }
    }
  }
  .bottom-btn-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 38rpx;
    padding-top: 30rpx;
    background: #fff;
    button{
      width: 90%;
      margin: 0 auto;
      height: 66rpx;
      line-height: 66rpx;
      border-radius: 33rpx;
      background: #3f81ff;
      color: #fff;
    }
  }
}
</style>