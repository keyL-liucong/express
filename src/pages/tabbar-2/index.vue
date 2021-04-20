<template>
  <view class="content" :style="{ height: height + 'px' }">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentIndex === index }"
        @click="tabClick(index)"
      >
        {{ item.text }}
      </view>
    </view>

    <swiper
      :current="tabCurrentIndex"
      class="swiper-box"
      duration="300"
      @change="changeTab"
    >
      <swiper-item
        class="tab-content"
        v-for="(tabItem, tabIndex) in navList"
        :key="tabIndex"
      >
        <scroll-view
          class="list-scroll-content"
          scroll-y
          @scrolltolower="loadData"
        >
          <!-- 空白页 -->
          <empty
            v-if="tabItem.loaded === true && tabItem.orderList.length === 0"
          ></empty>

          <!-- 订单列表 -->
          <!-- <view v-for="(order, index) in tabItem.orderList" :key="index">
            <order-item @order_update="update" :order="order"></order-item>
          </view> -->

          <load-more :status="tabItem.loadingType"></load-more>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
// import api from "@/service/api";
import empty from "@/components/empty";
// import orderItem from "./item";

export default {
  name: "order-list",
  components: {
    empty,
    // orderItem,
  },
  data() {
    return {
      tabCurrentIndex: 0,
      height: 600,
      navList: [
        {
          state: 0,
          text: "全部订单",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 1,
          text: "待揽收",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 2,
          text: "待处理",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 3,
          text: "待支付",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 3,
          text: "运输中",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 3,
          text: "已签收",
          loadingType: "more",
          orderList: [],
        },
      ],
    };
  },
  async created() {
    let systemInfo = uni.getSystemInfoSync();
    this.height = systemInfo.windowHeight;
    // let options = api.currentOptions();
    // if (options.state) {
    //   this.loadData("tabChange");
    //   this.tabCurrentIndex = parseInt(options.state);
    // } else {
    //   this.loadData("tabChange");
    // }
  },
  onShow() {
    this.loadData("tabChange");
  },
  async onPullDownRefresh() {
    this.loadData("tabChange");
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 800);
  },
  methods: {
    // 获取订单列表
    async loadData(source) {
      // 这里是将订单挂载到tab列表下
      let index = this.tabCurrentIndex;
      let navItem = this.navList[index];
      let state = navItem.state;
      if (source === "tabChange") {
        navItem.loadingType = "more";
        this.navList[index].orderList = [];
        navItem.orderList = [];
      }
      // 如果已经加载到底部
      if (navItem.loadingType === "noMore") {
        return;
      }
      // 防止重复加载
      if (navItem.loadingType === "loading") {
        return;
      }
      navItem.loadingType = "loading";

      try {
        // let orders = await api.httpGet("/api/order/list", {
        //   state,
        //   start: navItem.orderList.length,
        // });
        // navItem.orderList.push(...orders);

        // if (!orders || orders.length < 5) {
        //   navItem.loadingType = "noMore";
        // } else {
        //   navItem.loadingType = "more";
        // }
        // this.$set(navItem, "loaded", true);
        } catch (e) {
            console.error("load order error", e);
        // api.toastError(e.message);
      }
    },
    // swiper 切换
    changeTab(e) {
      this.tabCurrentIndex = e.target.current;
      this.loadData("tabChange");
    },
    // 顶部tab点击
    tabClick(index) {
      this.tabCurrentIndex = index;
    },
    update() {
      this.loadData("tabChange");
    },
  },
};
</script>

<style lang="scss">
.content {

  .swiper-box {
    height: calc(100% - 40px);
  }

  .list-scroll-content {
    height: 100%;
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
      position: relative;

      &.current {
          color: #FF6C00;
        &:after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 44px;
          height: 0;
          border-bottom: 2px solid #FF6C00;
        }
      }
    }
  }

  /*.uni-swiper-item {*/
  /*height: auto;*/
  /*}*/
}
</style>
