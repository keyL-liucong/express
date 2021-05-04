<template>
  <view class="app-container">
    <view class="form-box">
      <form @submit="formSubmit" @reset="formReset">
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">姓名</view>
            <input
              placeholder-class="tui-phcolor"
              class="tui-input"
              name="name"
              placeholder="请输入姓名"
              maxlength="50"
              type="text"
            />
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">电话</view>
            <input
              placeholder-class="tui-phcolor"
              class="tui-input"
              name="mobile"
              placeholder="请输入联系电话"
              maxlength="50"
              type="text"
            />
          </view>
        </tui-list-cell>
        <view class="tui-btn-box">
          <button
            class="tui-button-primary"
            hover-class="tui-button-hover"
            formType="submit"
            type="primary"
          >
            Submit
          </button>
          <button
            class="tui-button-primary tui-button-gray"
            hover-class="tui-button-gray_hover"
            formType="reset"
          >
            Reset
          </button>
        </view>
      </form>
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
  methods: {},
  async created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  padding: 30rpx;
  .form-box{
      
      box-shadow: 1px 2px -1px rgba(0,0,0,.4);
      > form{
border-radius: 8rpx;
      }
  }
}
</style>