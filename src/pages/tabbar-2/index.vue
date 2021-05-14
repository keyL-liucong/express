<template>
  <view class="content">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentStatus == item.status }"
        @click="tabClick(item)"
      >
        {{ item.text }}
      </view>
    </view>
    <view v-if="tabCurrentStatus == 2 && messageboxShow" class="message-box">
      <icon
        class="close-icon"
        name="shut"
        :size="20"
        unit="rpx"
        color="#000000"
        index="1"
        @click="messagePopClose"
      ></icon>
      <icon
        class="news-icon"
        name="news"
        :size="32"
        unit="rpx"
        color="#ffffff"
      ></icon>
      <view class="message-info">
        <text class="message-title">重要提示</text>
        <text class="message-text"
          >支付完成前可更改提货自提/派送到门，单独寄送/
          合箱寄送，支付后不可更改</text
        >
      </view>
    </view>

    <view class="order-list">
      <!-- 空白页 -->
      <empty v-if="orderlist == 0"></empty>

      <!-- 订单列表 -->
      <orderItem
        v-for="(orderitem, orderindex) in orderlist"
        :item="orderitem"
        :key="orderindex"
        v-on:setitempay="setOrderPay"
      ></orderItem>

      <uni-load-more
        v-if="orderlist.length < orderTotal"
        :status="loadingType"
      ></uni-load-more>
    </view>
    <view class="bttom-pay">
      <view class="price-box">
        <text class="price-lab">应付金额:</text>
        <text class="price-num">¥178</text>
      </view>
      <text class="pay-btn">立即支付</text>
    </view>
  </view>
</template> 
<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import empty from "@/components/empty";
import orderItem from "@/components/order-item/order-item.vue";
import icon from "@/components/tui-icon/tui-icon.vue";
import Api from "@/services/index";
import Json from "@/Json";
export default {
  components: {
    uniLoadMore,
    empty,
    icon,
    orderItem,
  },
  data() {
    return {
      messageboxShow: true,
      pageNum: 1,
      loadingType: "more",
      tabCurrentIndex: 0,
      tabCurrentStatus: 0,
      getorderListLock: false,
      orderTotal: 0,
      navList: [
        {
          status: 0,
          text: "全部订单",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 1,
          text: "待揽收",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 2,
          text: "待处理",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 3,
          text: "待支付",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 4,
          text: "运输中",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 5,
          text: "已签收",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
      ],
      orderlist: {},
    };
  },
  onLoad(options) {
    console.log(options);
    this.tabCurrentIndex = options.tabid || 0;
    this.loadData();
  },
  onShow() {},
  onReachBottom() {
    this.loadData();
  },
  methods: {
    //获取订单列表
    loadData(source) {
      var _self = this;
      if (_self.getorderListLock) {
        return;
      }
      _self.getorderListLock = true;
      // _self.pageNum > 1 && uni.showLoading({ title: "加载中1..." });
      _self.loadingType = "loading";
      var param = {
        size: 10,
        page: _self.pageNum,
        user_id: 25,
        order_status: _self.tabCurrentStatus,
      };
      this.$api.getAllOrderList(param).then(function (res) {
        if (res.status === 1) {
          _self.orderTotal = res.data.total;
          _self.orderlist =
            _self.pageNum == 1
              ? res.data.list
              : _self.orderlist.concat(res.data.list);
          _self.pageNum++;
        } else {
          _self.$toast("加载失败，请重试");
        }
        console.log(_self.orderlist.length);
        uni.hideLoading();
        _self.getorderListLock = false;
      });
    },
    //顶部tab点击
    tabClick(item) {
      this.tabCurrentStatus = item.status;
      this.loadData("tabChange");
      this.pageNum = 1;
    },
    messagePopClose(pro) {
      this.messageboxShow = false;
    },
    //删除订单
    deleteOrder(item, index) {
      var _self = this;
      uni.showLoading({
        title: "请稍后",
      });
      Api.methods
        .deleteOrder({ orderId: item.omsOrder.id })
        .then(function (res) {
          console.log(res);
          if (res.data.code === 200) {
            _self.navList[_self.tabCurrentIndex].orderList.splice(index, 1);
          } else {
            _self.$toast("删除失败");
          }
          uni.hideLoading();
        });
    },
    //取消订单
    cancelOrder(item) {
      var _self = this;
      uni.showLoading({
        title: "请稍后",
      });
      setTimeout(function () {
        let { stateTip, stateTipColor } = _self.orderStateExp(5);
        Api.methods
          .cancelOrder({ orderId: item.omsOrder.id })
          .then(function (res) {
            if (res.data.code === 200) {
              //取消订单后删除待付款中该项
              let list = _self.navList[1].orderList;
              let index = list.findIndex(
                (val) => val.omsOrder.id === item.omsOrder.id
              );
              index !== -1 && list.splice(index, 1);
            } else {
              uni.hideLoading();
              _self.$toast("取消失败");
              return;
            }
            let list = _self.navList[0].orderList;
            let index = list.findIndex(
              (val) => val.omsOrder.id === item.omsOrder.id
            );
            index !== -1 && list.splice(index, 1);
            uni.hideLoading();
          });
      }, 600);
    },
    setOrderPay(item) {
      console.log(item);
    },
    toPay(orderSn) {
      // uni.redirectTo({
      //   url: "/pages/money/pay?orderSn=" + orderSn,
      // });
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: String(Date.now()),
        nonceStr: "A1B2C3D4E5",
        package: "prepay_id=wx20180101abcdefg",
        signType: "MD5",
        paySign: "",
        success: function (res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function (err) {
          console.log("fail:" + JSON.stringify(err));
        },
      });
    },
    confirmReceipt(item) {
      var _self = this;
      uni.showLoading({
        title: "请稍后",
      });
      setTimeout(() => {
        Api.methods
          .confirmReceipt({ orderId: item.omsOrder.id })
          .then(function (res) {
            if (res.data.code === 200) {
              //取消订单后删除待付款中该项
              let list = _self.navList[3].orderList;
              let index = list.findIndex(
                (val) => val.omsOrder.id === item.omsOrder.id
              );
              index !== -1 && list.splice(index, 1);
            } else {
              _self.$toast("操作失败");
            }

            item = Object.assign(item, {
              state: 3,
            });
            uni.hideLoading();
          });
      }, 600);
    },
    //订单状态文字和颜色
    orderStateExp(state) {
      let stateTip = "",
        stateTipColor = "#fa436a";
      switch (+state) {
        case 0:
          stateTip = "待付款";
          break;
        case 1:
          stateTip = "待发货";
          break;
        case 2:
          stateTip = "已发货";
          break;
        case 3:
          stateTip = "已完成";
          break;
        case 4:
          stateTip = "订单已关闭";
          stateTipColor = "#909399";
          break;
        case 5:
          stateTip = "无效订单";
          stateTipColor = "#909399";
          break;
        //更多自定义
      }
      return { stateTip, stateTipColor };
    },
    navTo(url) {
      if (!this.hasLogin) {
        url = "/pages/public/login";
      }
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style lang="scss">
html,
body,
page {
  background: #f3f3f3;
}
.content {
  background: #f3f3f3;
}

.navbar {
  display: flex;
  height: 40px;
  padding: 0 5px;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;
  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 15px;
    color: #303133;
    position: relative;
    &.current {
      color: #fa436a;
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 44px;
        height: 0;
        border-bottom: 2px solid #fa436a;
      }
    }
  }
}
.message-box {
  display: flex;
  position: relative;
  width: 690rpx;
  height: 128rpx;
  margin: 20rpx auto 0;
  background-color: rgba(255, 217, 188, 0.8);
  align-items: center;
  border-radius: 20rpx;
  .news-icon {
    margin-left: 14rpx;
    background-color: #ff4848;
    margin-top: -8px;
    border-radius: 50%;
  }
  .close-icon {
    position: absolute;
    top: 20rpx;
    right: 36rpx;
  }
  .message-info {
    margin-left: 16rpx;
    color: #000;
    font-weight: 600;
  }
  .message-title {
    display: block;
    height: 40rpx;
    font-size: 28rpx;
    line-height: 40rpx;
  }
  .message-text {
    display: block;
    font-size: 24rpx;
    line-height: 34rpx;
  }
}

.order-list {
  padding: 20rpx 30rpx;
}

/* load-more */
.uni-load-more {
  display: flex;
  flex-direction: row;
  height: 80upx;
  align-items: center;
  justify-content: center;
}

.uni-load-more__text {
  font-size: 28upx;
  color: #999;
}

.uni-load-more__img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}

.uni-load-more__img > view {
  position: absolute;
}

.uni-load-more__img > view view {
  width: 6px;
  height: 2px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  background: #999;
  position: absolute;
  opacity: 0.2;
  transform-origin: 50%;
  animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
  transform: rotate(90deg);
  top: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
  transform: rotate(180deg);
  top: 11px;
  right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
  transform: rotate(270deg);
  bottom: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
  top: 11px;
  left: 0;
}

.load1,
.load2,
.load3 {
  height: 24px;
  width: 24px;
}

.load2 {
  transform: rotate(30deg);
}

.load3 {
  transform: rotate(60deg);
}

.load1 view:nth-child(1) {
  animation-delay: 0s;
}

.load2 view:nth-child(1) {
  animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
  animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
  animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
  animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
  animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
  animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
  animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
  animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
  animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
  animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
  animation-delay: 1.43s;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
.bttom-pay {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120rpx;
  background-color: #fff;
  padding: 0 28rpx;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 16rpx 16rpx 0 0;
  .price-box {
    display: flex;
    align-items: center;
    .price-lab {
      font-size: 32rpx;
      color: #000;
      font-weight: bold;
    }
    .price-num {
      margin-left: 18px;
      font-size: 44rpx;
      color: #ff0000;
      font-weight: bold;
    }
  }
  .pay-btn {
    display: flex;
    width: 290rpx;
    height: 80rpx;
    font-size: 36rpx;
    color: #fff;
    align-items: center;
    justify-content: center;
    border-radius: 50rpx;
    background-image: linear-gradient(0deg, #ff9b00 0%, #ff6c00 100%);
  }
}
</style>