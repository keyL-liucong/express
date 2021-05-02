<template>
  <view class="app-container">
    <view class="top-part">
      <view class="info-box">
        <view class="header-img">
          <image
            :src="memberInfo.avator || '../../static/index-1.png'"
            mode=""
          />
        </view>
        <view class="info-line" v-if="memberInfo">
          <view class="name">{{ memberInfo.nick_name }}</view>
          <view class="mobile">{{ memberInfo.mobile }}</view>
          <view class="code">
            <view class="code-left">会员编号：{{ memberInfo.member_no }}</view>
            <view class="code-right">
              <text>修改</text>
              <image src="../../static/white-arrow.png" mode="" />
            </view>
          </view>
        </view>
        <view class="info-line" v-else @click="handleLogin">
          <view class="name">登录 | 注册</view>
          <view class="mobile">hello,欢迎来到米推客</view>
        </view>
      </view>
      <view class="info-show-box">
        <view class="left-box box">
          <view class="num">{{ money }}</view>
          <view class="desc">余额</view>
        </view>
        <view class="center-box box">
          <view class="num">{{ income  }}</view>
          <view class="desc">累计收益</view>
        </view>
        <navigator class="right-box box"  @click="navTo">
          <view class="num">{{ couponTotal }}</view>
          <view class="desc">优惠卷</view>
        </navigator>
      </view>
    </view>
    <view class="center-part-wrap">
      <view class="center-part">
        <view class="center-box">
          <img src="../../static/center-1.png" alt="" />
          <text>地址簿</text>
        </view>
        <view class="center-box">
          <img src="../../static/center-2.png" alt="" />
          <text>运费与实效</text>
        </view>
        <view class="center-box">
          <img src="../../static/center-3.png" alt="" />
          <text>违禁品</text>
        </view>
        <view class="center-box">
          <img src="../../static/center-4.png" alt="" />
          <text>申请发票</text>
        </view>
      </view>
    </view>
    <view class="item-list-wrap">
      <tui-list-view color="#777">
        <tui-list-cell arrow radius="true" padding="30rpx" color="#000000">
          邀请下单
        </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000">
          我的运费
        </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000">
          我的运单
        </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000">
          自寄到仓地址
        </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000">
          自提点查询
        </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000">
          我的推荐
        </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo()">
          投诉建议
        </tui-list-cell>
        <tui-list-cell arrow padding="30rpx" color="#000000">
          退出
        </tui-list-cell>
      </tui-list-view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      money: '0.00',
      income: '0.00',
      couponTotal: 0,
      memberInfo: null,
    };
  },
  methods: {
    handleLogin(){
        this.$page.navigateTo({ url: "/pages/login/index" });
    },
    navTo() {
        this.$page.navigateTo({ url: "/pages/coupon/index" });
    },
    // navTo() {
    //   uni.navigateTo({
    //     url: "/pages/feedback/index",
    //   });
    // },
  },
  async created() {
    if (this.$cache.get("token")) {
      let res = await this.$api.getMemberInfo();
      this.memberInfo = res.data.userInfo;
      this.money = res.data.money;
      this.income = res.data.income;
      this.couponTotal = res.data.couponTotal;
    }
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  .top-part {
    height: 225px;
    background-image: linear-gradient(to right, #ff9900, #ff7100);
    border-bottom-right-radius: 50rpx;
    border-bottom-left-radius: 50rpx;
    color: #fff;
    padding-top: 100rpx;
    padding-left: 44rpx;
    .info-box {
      display: flex;
      align-items: center;
      .header-img {
        width: 122rpx;
        height: 122rpx;
        border-radius: 65rpx;
        margin-top: 28rpx;
        margin-right: 22rpx;
        border: 6rpx solid #ffc880;
        image {
          width: 100%;
          height: 100%;
          border-radius: 65rpx;
        }
      }
      .info-line {
        width: calc(100% - 160rpx);
        padding-top: 12rpx;
        padding-right: 30rpx;
        .name {
          font-size: 40rpx;
        }
        .code {
          display: flex;
          justify-content: space-between;
          image {
            width: 12rpx;
            height: 20rpx;
          }
          .code-right {
            > text {
              margin-right: 10rpx;
            }
          }
        }
      }
    }
    .info-show-box {
      display: flex;
      text-align: center;
      margin-top: 50rpx;
      .box {
        width: 33%;
        .num {
          margin-bottom: 10rpx;
        }
      }
      .center-box {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 30%;
          border-left: 1px solid #fff;
          height: 40rpx;
        }
        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 30%;
          border-left: 1px solid #fff;
          height: 40rpx;
        }
      }
    }
  }
  .center-part-wrap {
    padding: 0 30rpx;
    .center-part {
      position: relative;
      bottom: 51px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding: 20px 30px;
      border-radius: 16rpx;
      .center-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 75rpx;
          height: 75rpx;
          margin-bottom: 10rpx;
        }
      }
    }
  }
  .item-list-wrap {
    position: relative;
    bottom: 70rpx;
    padding: 0 30rpx;
    border-radius: 16rpx;
  }
}
</style>