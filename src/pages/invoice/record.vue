<template>
    <view class="wrap">
        <view v-if="recordList.length == 0" class="record-list">
          <view class="record-item">
            <view class="item-info">
              <text class="info-lab">抬头</text>
              <text class="info-val">大公司</text>
            </view>
            <view class="item-info">
              <text class="info-lab">金额</text>
              <text class="info-val">¥60</text>
            </view>
            <view class="item-info">
              <text class="info-lab">时间</text>
              <text class="info-val">2021-10-19</text>
            </view>
          </view>
          <text class="loading-text">已无更多发票</text>
        </view>
        <view  v-else-if="pageLoad" class="empty-box">
             <image style="width:440rpx; height: 440rpx;" mode="aspectFit" src="@/static/invoice-list-empty-icon.png"></image>
             <text class="empty-text">暂无数据</text>
        </view>
    </view>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      isGet: false,
      pageNum: 1,
      recordList:[],
      pageLoad: false,
      loadingText: "请上拉刷新～"
    };
  },
  onLoad(options) {
      this.getList();
  },
  onShow() {},
  onReachBottom() {
    this.getList();
  },
  methods: {
    getList(){
      let _self = this;
      if(_self.isGet){
        return;
      }
      _self.isGet = true;
      setTimeout(function(){
        _self.pageLoad = true;
        _self.isGet = false;
        _self.pageNum++
      },2000)
    }
  },
};
</script>

<style lang="scss">
      html, body{
        background: #F3F3F3;
      }
      .record-list{
        width: 690rpx;
        margin: 0 auto;
      }
      .record-item{
        padding: 34rpx 40rpx 2rpx;
        margin-top: 20rpx;
        background: #fff;
        border-radius: 16rpx;
        .item-info{
          display: flex;
          align-items: center;
          margin-bottom: 30rpx;
          .info-lab{
            font-size: 24rpx;
            line-height: 34rpx;
            color: #7B7B7B;
          }
          .info-val{
            margin-left: 40rpx;
            font-size: 28rpx;
            line-height: 40rpx;
            color: #000;
          }
        }
      }
      .loading-text{
        display: block;
        width: 100%;
        margin-top: 34rpx;
        font-size: 24rpx;
        line-height: 34rpx;
        text-align : center;
        color: #7B7B7B;
      }

</style>