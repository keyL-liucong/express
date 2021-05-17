<template>
  <view class="wrap">
    <view v-if="recordList.length > 0" class="record-list">
      <view v-for="(recordItem, recordindex) in recordList" :key="recordindex" class="record-item">
        <view class="item-info">
          <text class="info-lab">抬头</text>
          <text class="info-val">{{recordItem.head}}</text>
        </view>
        <view class="item-info">
          <text class="info-lab">金额</text>
          <text class="info-val">¥{{recordItem.money}}</text>
        </view>
        <view class="item-info">
          <text class="info-lab">时间</text>
          <text class="info-val">{{recordItem.created}}</text>
        </view>
      </view>
      <text class="loading-text">已无更多发票</text>
    </view>
    <view v-else-if="pageLoad" class="empty-box">
      <image
        style="width: 440rpx; height: 440rpx"
        mode="aspectFit"
        src="https://static.51mitui.com/wxMini/static/empty-data.png"
      ></image>
      <text class="empty-text">暂无数据</text>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isGet: false,
      pageNum: 1,
      recordList: [],
      pageLoad: false,
      loadingText: "请上拉刷新～",
      totalNum: 15,
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
    getList() {
      let _self = this;
      if (_self.isGet || (_self.totalNum == _self.recordList.length)) {
        return;
      }
      _self.isGet = true;
      this.$api.getInvoice({ page: _self.pageNum }).then((res) => {
        if (res.status == 1) {
          let list = res.data.list;
          _self.totalNum = res.data.total;
            _self.pageLoad = true;
            _self.pageNum++;
            _self.recordList = _self.pageNum == 1 ? list : _self.recordList.concat(list);
            _self.loadingText = _self.totalNum == _self.recordList.length ? "已无更多发票" : "请上拉刷新～";
        } else {
          _self.$toast(res.info);
        }
        _self.isGet = false;
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  background: #f3f3f3;
}
.record-list {
  width: 690rpx;
  margin: 0 auto;
}
.record-item {
  padding: 34rpx 40rpx 2rpx;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  .item-info {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    .info-lab {
      font-size: 24rpx;
      line-height: 34rpx;
      color: #7b7b7b;
    }
    .info-val {
      margin-left: 40rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
  }
}
.loading-text {
  display: block;
  width: 100%;
  margin-top: 34rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  text-align: center;
  color: #7b7b7b;
}
.empty-box{
  padding-top: 224rpx;
  image{
    display: block;
    margin: 0 auto;
  }
  .empty-text{
    display: block;
    text-align: center;
    font-size: 32rpx;
    line-height: 44rpx;
    color: #FF6C00;
  }
}
</style>