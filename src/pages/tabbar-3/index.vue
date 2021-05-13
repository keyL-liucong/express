<template>
  <view class="app-container">
    <view class="send-part-box">
      <view class="row line">
        <view class="tag tag-1">寄</view>
        <view class="send-info" v-if="!sendAddr">
          <view class="row"> 寄件人信息 </view>
          <view class="row gray"> 点击填写寄件地址 </view>
        </view>
        <view class="send-info" v-else>
          <view class="row"> 
            <text class="name">{{ sendAddr.realname }}</text>
            <text class="mobile">{{ sendAddr.mobile }}</text>
          </view>
          <view class="row gray"> {{sendAddr.address}} </view>
        </view>
        <view class="address" @click="navTo('/pages/address/index?currentTab=1')"> 地址簿 </view>
      </view>
      <view class="row">
        <view class="tag tag-2">收</view>
        <view class="send-info" v-if="!receAddr" @click="navTo('')">
          <view class="row"> 收件人信息 </view>
          <view class="row gray"> 点击填写收件地址 </view>
        </view>
        <view class="send-info" v-else>
          <view class="row"> 
            <text>{{ receAddr.realname }}</text>
            <text>{{ receAddr.mobile }}</text>
          </view>
          <view class="row gray"> {{receAddr.address}} </view>
        </view>
        <view class="address" @click="navTo('/pages/address/index?currentTab=0')"> 地址簿 </view>
      </view>
    </view>
    <view class="send-info-box">
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">物品信息</view>
          <input
            class="thorui-input"
            placeholder="请申报您寄送的物品信息>"
            placeholder-class="thorui-phcolor"
            v-model="name"
            disabled="true"
          />
        </view>
      </tui-list-cell>
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">预估重量</view>
          <input
            class="thorui-input"
            placeholder="请输入包裹的预估重量 KG"
            placeholder-class="thorui-phcolor"
            v-model="name"
            disabled="true"
          />
          <icon type="clear" :size="14" v-if="name" @tap="name = ''"></icon>
        </view>
      </tui-list-cell>
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">预估体积重</view>
          <input
            class="thorui-input"
            placeholder="补充体积预估费用更准备 KG"
            placeholder-class="thorui-phcolor"
            v-model="name"
            disabled="true"
          />
          <icon type="clear" :size="14" v-if="name" @tap="name = ''"></icon>
        </view>
      </tui-list-cell>
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">增值服务</view>
          <input
            class="thorui-input"
            placeholder="贵重物品建议购买保价>"
            placeholder-class="thorui-phcolor"
            v-model="name"
            disabled="true"
          />
          <icon type="clear" :size="14" v-if="name" @tap="name = ''"></icon>
        </view>
      </tui-list-cell>
      <view class="upload-img">
        <view class="row">
          <text>包裹拍照</text>
          <text>(最多三张)</text>
        </view>
        <view class="img-list">
          <tui-upload
            :value="value"
            :serverUrl="serverUrl"
            @complete="result"
            @remove="remove"
          ></tui-upload>
        </view>
      </view>
    </view>
    <view class="send-type-box">
      <view class="row line">
        <view class="row-left">寄件方式</view>
        <view class="row-right">
          <radio-group @change="radioChange">
            <label
              class="thorui-radio thorui-align__center thorui-padding"
              style="margin-right: 20rpx"
            >
              <radio color="#5677fc" :value="1"></radio>
              <text class="thorui-left__sm"> 上门取件</text>
            </label>
            <label class="thorui-radio thorui-align__center thorui-padding">
              <radio color="#5677fc" :value="1"></radio>
              <text class="thorui-left__sm">自寄下单</text>
            </label>
          </radio-group>
        </view>
      </view>
      <view class="row">
        <view class="row-left">上门取件时间</view>
        <view class="row-right" @click="dateShow">
          {{ result }}
          <tui-datetime
            :type="1"
            ref="dateTime"
            @confirm="change"
          ></tui-datetime>
        </view>
      </view>
    </view>
    <label class="thorui-radio" style="margin-right: 20rpx">
      <radio color="#5677fc" :value="1"></radio>
      <text class="thorui-left__sm">我已同意并阅读《物流服务协议》</text>
    </label>
    <view class="send-buy-box">
      <view class="left">
        <view class="top"> 预估运费<text>￥ 0 </text>起 </view>
        <view class="bottom">
          最终运费以到仓称重确认为准 |<text>运费明细</text>
        </view>
      </view>
      <view class="right">
        <button>立即下单</button>
      </view>
    </view>
  </view>
</template>

<script>
import tuiDatetime from "../../components/tui-datetime/tui-datetime";
export default {
  components: {
    tuiDatetime,
  },
  data() {
    return {
      couponList: [],
      result: "",
      sendAddr:null,
      receAddr:null
    };
  },
  async onLoad() {
    let date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    this.result = `${year}-${month}-${day} ${hour}:${minute}`;
    this.sendAddr = await this.getDefaultAddr(1);
    this.receAddr = await this.getDefaultAddr(2);
    //   this.show();
  },
  methods: {
    navTo(url){
      this.$href.navigateTo({url});
    },
    // 获取默认地址
    async getDefaultAddr(type) {
      let res = await this.$api.getDefaultAddr({
        type, // 1默认寄件地址 2默认收件地址
      });
      return res.data[0];
    },
    radioChange() {},
    dateShow: function (e) {
      this.$refs.dateTime.show();
    },
    change: function (e) {
      //选择的结果
      console.log(e);
      this.result = e.result;
    },
  },
  async created() {},
  mounted() {},
};
</script>
<style lang='scss'>
.app-container {
  background: #f3f3f3;
  padding: 20rpx;
  padding-bottom: 200px;
  .send-part-box {
    padding: 0 20rpx;
    background: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    > .row {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      .tag {
        color: #fff;
        padding: 4rpx 2rpx;
        height: 40rpx;
        width: 40rpx;
        text-align: center;
        line-height: 40rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
      }
      .tag-1 {
        background: #3f81ff;
      }
      .tag-2 {
        background: #ff8400;
      }
      .send-info {
        flex: 1;
        border-right: 1px solid #ccc;
        > .row {
          height: 50rpx;
          line-height: 50rpx;
          > text{
            margin-right: 20rpx;
          }
          .mobile{
            font-size: 14px;
            color: #ccc;
          }
        }
        .gray {
          color: #ccc;
        }
      }
      .address {
        padding: 0 20rpx;
      }
    }
    > .line {
      border-bottom: 1px solid rgba(204, 204, 204, 0.3);
    }
  }
  .send-info-box {
    border-radius: 16rpx;
    .thorui-input-item {
      display: flex;
      justify-content: space-between;
      .thorui-input {
        flex: 1;
        text-align: right;
        .thorui-phcolor {
          text-align: right !important;
        }
      }
    }
    .upload-img {
      background: #fff;
      padding: 30rpx;
      margin-bottom: 20rpx;
      .row {
        margin-bottom: 20rpx;
      }
    }
  }
  .send-type-box {
    background: #fff;
    margin-bottom: 20rpx;
    .line {
      border-bottom: 1px solid rgba(204, 204, 204, 0.3);
    }
    > .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      height: 66rpx;
    }
  }
  > .thorui-radio {
  }
  .send-buy-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10rpx 30rpx 50rpx 30rpx;
    background: #fff;
    font-size: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .top {
        > text {
          color: #ff9800;
          font-size: 32rpx;
          margin-right: 10rpx;
        }
      }
      .bottom {
        > text {
          color: #3f81ff;
          margin-left: 10rpx;
        }
      }
    }
    .right {
      button {
        background: #3f81ff;
        color: #fff;
        height: 60rpx;
        border-radius: 30rpx;
        line-height: 60rpx;
      }
    }
  }
}
</style>