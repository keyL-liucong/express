<template>
  <view class="app-container">
    <view class="progress-box">
      <view class="title">
        <view
          @click="handleNavShow('left')"
          class="title-left"
          :class="[navShow === 'left' ? 'selected' : '']"
          >国际</view
        >
        <view
          @click="handleNavShow('right')"
          class="title-right"
          :class="[navShow === 'right' ? 'selected-2' : '']"
          >港台地区</view
        >
      </view>
      <view class="buy-content" v-if="navShow === 'left'">
        <view class="right-progress">
          <view class="content">
            <view class="line-1">
              <view class="left">
                <view>收</view>
                <view>收件地址</view>
              </view>
              <view>清空</view>
            </view>
            <view class="line-2"> 注意：国际收件人信息请用英文填写 </view>
            <view class="line-3">
              <view class="left">
                <view>姓名</view>
                <view class="eng-str">Name</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请使用英文输入" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>国家/地区</view>
                <view class="eng-str">County/Region</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请选择" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>境外电话</view>
                <view class="eng-str">Phone</view>
              </view>
              <view class="right">
                <view class="left-input">
                  <input type="text" placeholder="区号" />
                </view>
                <view class="right-input">
                  <input type="text" placeholder="电话号码" />
                </view>
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>邮编</view>
                <view class="eng-str">Zip Code</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请输入邮编" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>州(省)</view>
                <view class="eng-str">State</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请选择" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>详细地址</view>
                <view class="eng-str">Detail Address</view>
              </view>
              <view class="right">
                <input
                  type="text"
                  placeholder="请使用英文输入(需精确到门牌号)"
                />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>公司名称</view>
                <view class="eng-str">Company Address</view>
              </view>
              <view class="right">
                <input type="text" placeholder="(选填)如：EXPRESS CO,LTD" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="buy-content" v-if="navShow === 'right'">
        <view class="right-progress">
          <view class="content">
            <view class="line-1">
              <view class="left">
                <view>收</view>
                <view>收件地址</view>
              </view>
              <view>清空</view>
            </view>
            <view class="line-2"> 注意：国际收件人信息请用英文填写 </view>
            <view class="line-3">
              <view class="left">
                <view>姓名</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请输入名字" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>地区</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请选择地区" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>电话</view>
              </view>
              <view class="right">
                <view class="left-input">
                  <input type="text" placeholder="区号" />
                </view>
                <view class="right-input">
                  <input type="text" placeholder="请输入电话" />
                </view>
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>邮编</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请输入邮编" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>城市</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请选择" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>详细地址</view>
              </view>
              <view class="right">
                <input type="text" placeholder="精确到门牌号" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>公司名称</view>
                <view>Company Address</view>
              </view>
              <view class="right">
                <input type="text" placeholder="(选填)如：EXPRESS CO,LTD" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="row default-row">
      <text class="tit">设为默认寄件地址</text>
      <switch
        :checked="addressData.is_default == 1"
        color="#ff7100"
        @change="switchChange"
      />
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      navShow: "left",
    };
  },
  methods: {
    // nav展示
    handleNavShow(parm) {
      console.log(parm);
      this.navShow = parm;
    },
  },
  async onLoad() {
    let res = await this.$api.getCountryAddrList({ is_china: 0 });
    console.log(res);
    let res1 = await this.$api.getCountryAddrList({ is_china: 1 });
    console.log(res1);
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  padding: 40rpx 30rpx;
  .progress-box {
    border-radius: 24rpx;
    box-shadow: 0px 4px 7px 0px rgba(16, 81, 179, 0.08);
    > .title {
      border-radius: 24rpx 24rpx 0 0;
      display: flex;
      text-align: center;
      height: 68rpx;
      line-height: 68rpx;
      background: #ececee;
      color: #011128;
      font-weight: 400;
      .title-left {
        width: 50%;
      }
      .title-right {
        width: 50%;
      }
      .selected {
        font-size: 32rpx;
        font-weight: bold;
        background: #fff;
        border-radius: 24rpx 24rpx 0px 0px;
      }
      .selected-2 {
        font-size: 32rpx;
        font-weight: bold;
        background: #fff;
        border-radius: 24rpx 0 0px 0px;
      }
    }
    .buy-content {
      display: flex;
      padding: 40rpx;
      background: #fff;
      border-radius: 24rpx;
      .left-progress {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24rpx;
        padding-top: 4px;
        .p-1-line {
          height: 44px;
          border-left: 1px solid #cccccc;
        }
        .point {
          line-height: 17px;
          background: #cccccc;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          text {
            color: #011128;
            position: relative;
            right: -5px;
            top: -1px;
          }
        }
        .p-2-line {
          border-left: 1px solid #cccccc;
          height: 62px;
        }
        .active {
          background: #00cb98;
        }
        .line-active {
          border-left: 1px solid #00cb98;
        }
      }
      .right-progress {
        width: 100%;
        margin-left: 8px;
        .content {
          .line-1 {
            display: flex;
            justify-content: space-between;
            padding: 30rpx 0;
            .left {
              display: flex;
              :first-child {
                background: #ff7100;
                color: #fff;
                width: 46rpx;
                height: 46rpx;
                line-height: 46rpx;
                text-align: center;
                border-radius: 8rpx;
                margin-right: 20rpx;
              }
            }
          }
          .line-2 {
            background: #f9e6d7;
            color: #ff7100;
            padding: 10rpx 20rpx;
            border-radius: 12rpx;
            margin-bottom: 20rpx;
          }
          .line-3 {
            border-bottom: 1px solid #f3f3f3;
            display: flex;
            align-items: center;
            padding: 16rpx 0;
            > .left {
              width: 180rpx;
              color: #7b7b7b;
              .eng-str {
                font-size: 12px;
              }
            }
            > .right {
              display: flex;
              .left-input {
                display: block;
                width: 80rpx;
                margin-right: 10rpx;
                border-right: 1px solid #f3f3f3;
              }
              .right-input {
                display: block;
              }
            }
          }
        }
      }
    }
  }
  .row {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 30upx;
    height: 110upx;
    background: #fff;
    border-bottom: 1px solid #f3f3f3;
  }
  .default-row {
    margin-top: 16upx;
    .tit {
      flex: 1;
    }
    switch {
      transform: translateX(16upx) scale(0.9);
    }
  }
}
</style>