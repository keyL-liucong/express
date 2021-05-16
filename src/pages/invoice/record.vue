<template>
    <view class="wrap">
        <view v-if="0" class="invoice-list">
        <invoiceItem class="e"></invoiceItem>
        </view>
        <view class="empty-box">
             <image style="width:440rpx; height: 440rpx;" mode="aspectFit" src="@/static/invoice-list-empty-icon.png"></image>
             <text class="empty-text">暂无数据</text>
        </view>
    </view>
</template>

<script>
export default {
  components: {
    invoiceItem,
  },
  data() {
    return {};
  },
  onLoad(options) {},
  onShow() {},
  onReachBottom() {},
  methods: {},
};
</script>

<style lang="sass">
</style>