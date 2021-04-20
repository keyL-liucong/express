<template>
  <view class="app-container">
    <view class="item-list-wrap" @click="navTo(e)">
      <tui-list-view  color="#777">
        <tui-list-cell arrow radius=true padding="30rpx" color="#000000"> 费用问题 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 下单流程 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 上门揽收问题 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 活动相关问题 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 包裹超时未派送 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 收到包裹有问题 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000" > 轨迹显示签收但未收到包裹 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 客服服务问题 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 商务合作 </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000"> 其他问题 </tui-list-cell>
      </tui-list-view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
     navTo(e) {
       console.log(e);
      uni.navigateTo({
          url: '/pages/feedback/form'
      });
    }

  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  padding: 15px;  
  height: 100vh;
 
  
}
</style>