<template>
  <view class="app-container">
    <view class="top-content">
      <view class="row">
        您的问题类型:费用问题
      </view>
      <view class="row">
       反馈内容:
      </view>
      <textarea name="" id="" placeholder="描述一下您的问题，便于我们即时处理"></textarea>
    </view>
    <view class="upload-img">
      <view class="row">
        <text>相关凭证</text>
         <text>(最多三张)</text>
      </view>
      <view class="img-list">
        <tui-upload :value="value" :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
      </view>
    </view>
    <view class="bottom-content">
      <view class="row line">
        <text>联系电话</text>
        <text>18766775544</text>
      </view>
      <view class="row">
        <text>邮箱</text>
        <input placeholder="海外用户请填写可联系的邮箱"/>
      </view>
    </view>
    <view class="btn-box">
        <tui-button width="686rpx" height="80rpx" shape="circle" type="warning">提交</tui-button>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  padding: 15px;  
  height: 100vh;
  .top-content{
    background: #fff;
    padding: 24rpx 30rpx;
    margin-bottom: 30rpx;
    .row{
      margin-bottom: 20rpx;
    }
    > textarea{
      width: 100%;
      height: 240rpx;
      border-radius: 16rpx;
      background: #F3F3F3;
      padding: 20rpx;
      box-sizing: border-box;
    }
  }
  .upload-img{
    background: #fff;
    padding: 30rpx;
    margin-bottom: 30rpx;
    .row{
      margin-bottom: 20rpx;
    }
  }
  .bottom-content{
    background: #fff;
    padding: 0 30rpx;
    margin-bottom: 60rpx;
    .row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 104rpx;
    }
    .line{
      border-bottom: 1px solid #F3F3F3;
    }
  }
}
</style>