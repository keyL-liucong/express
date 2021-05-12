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

    <!-- <scroll-view
      class="list-scroll-content"
      scroll-y
      @scrolltolower="loadData"
    > -->
    <view class="order-list">
      <!-- 空白页 -->
      <empty v-if="orderlist == 0"></empty>

      <!-- 订单列表 -->
      <view v-for="(orderitem, orderindex) in orderlist" :key="item.order_sn" class="order-item">
        
        <view class="action-box b-t">
          <button
            class="action-btn"
            v-if="item.omsOrder.status === 0"
            @click="cancelOrder(item)"
          >
            取消订单
          </button>
          <button
            class="action-btn recom"
            v-if="item.omsOrder.status === 0"
            @click="toPay(item.omsOrder.orderSn)"
          >
            立即支付
          </button>
          <button
            class="action-btn recom"
            v-if="item.omsOrder.status === 2"
            @click="confirmReceipt(item)"
          >
            确认收货
          </button>
          <button
            class="action-btn recom"
            v-if="item.omsOrder.status === 2 || item.omsOrder.status === 3"
            @click="
              navTo(
                '/pages/order/aftersale/aftersale?orderSn=' +
                  item.omsOrder.orderSn
              )
            "
          >
            申请售后
          </button>
        </view>
      </view>

      <uni-load-more v-if="orderlist.length < orderTotal" :status="loadingType"></uni-load-more>
    </view>
    <!-- </scroll-view> -->
  </view>
</template> 

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import empty from "@/components/empty";
import Api from "@/services/index";
import Json from "@/Json";
export default {
  components: {
    uniLoadMore,
    empty,
  },
  data() {
    return {
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
      orderlist: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      },
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
      var param = { size: 10, page: _self.pageNum, user_id: 25, order_status: _self.tabCurrentStatus};
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
    toPay(orderSn) {
      uni.redirectTo({
        url: "/pages/money/pay?orderSn=" + orderSn,
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
html, body, page{
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

.order-list{
  padding: 10rpx 15rpx;
}

.order-item {
  display: flex;
  flex-direction: column;
  padding-left: 30upx;
  background: #fff;
  margin-top: 16upx;
  .i-top {
    display: flex;
    align-items: center;
    height: 80upx;
    padding-right: 30upx;
    font-size: 28rpx;
    color: #303133;
    position: relative;
    .time {
      flex: 1;
    }
    .state {
      color: #fa436a;
    }
    .del-btn {
      padding: 10upx 0 10upx 36upx;
      font-size: 32rpx;
      color: $font-color-light;
      position: relative;
      &:after {
        content: "";
        width: 0;
        height: 30upx;
        border-left: 1px solid $border-color-dark;
        position: absolute;
        left: 20upx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  /* 多条商品 */
  .goods-box {
    height: 160upx;
    padding: 20upx 0;
    white-space: nowrap;
    .goods-item {
      width: 120upx;
      height: 120upx;
      display: inline-block;
      margin-right: 24upx;
    }
    .goods-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  /* 单条商品 */
  .goods-box-single {
    display: flex;
    padding: 20upx 0;
    .goods-img {
      display: block;
      width: 120upx;
      height: 120upx;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 30upx 0 24upx;
      overflow: hidden;
      .title {
        font-size: 30rpx;
        color: #303133;
        line-height: 1;
      }
      .attr-box {
        font-size: 26rpx;
        color: $font-color-light;
        padding: 10upx 12upx;
      }
      .price {
        font-size: 30rpx;
        color: #303133;
        &:before {
          content: "￥";
          font-size: $font-sm;
          margin: 0 2upx 0 8upx;
        }
      }
    }
  }

  .price-box {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    padding: 20upx 30upx;
    font-size: 26rpx;
    color: $font-color-light;
    .num {
      margin: 0 8upx;
      color: #303133;
    }
    .price {
      font-size: 32rpx;
      color: #303133;
      &:before {
        content: "￥";
        font-size: $font-sm;
        margin: 0 2upx 0 8upx;
      }
    }
  }
  .action-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100upx;
    position: relative;
    padding-right: 30upx;
  }
  .action-btn {
    width: 160upx;
    height: 60upx;
    margin: 0;
    margin-left: 24upx;
    padding: 0;
    text-align: center;
    line-height: 60upx;
    font-size: 26rpx;
    color: #303133;
    background: #fff;
    border-radius: 100px;
    &:after {
      border-radius: 100px;
    }
    &.recom {
      background: #fff9f9;
      color: #fa436a;
      &:after {
        border-color: #f7bcc8;
      }
    }
  }
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
</style>