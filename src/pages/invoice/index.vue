<template>
  <view v-if="fillInStatus == 0" class="wrap">
    <view v-if="orderlist.length > 0" class="invoice-list">
      <invoiceitem
        v-for="(orderItem, orderIndex) in orderlist"
        :key="orderIndex"
        @select="selectItem"
        :item="orderItem"
      ></invoiceitem>
    </view>
    <view v-else-if="pageLoad" class="empty-box">
      <image
        style="width: 440rpx; height: 440rpx"
        mode="aspectFit"
        src="@/static/invoice-list-empty-icon.png"
      ></image>
      <text class="empty-text">暂无数据</text>
    </view>
    <view v-if="orderlist.length > 0" class="torecord-btn">
      <text class="btn-icon"></text>
      <text class="btn-text">开票记录</text>
    </view>
    <view v-if="orderlist.length > 0" class="page-bottom">
      <view class="select-box" @click="setAllSelect">
        <icon
          v-if="allSelect"
          name="circle-fill"
          size="40"
          unit="rpx"
          class="item-selct-icon"
          color="#2cb241"
        ></icon>
        <icon
          v-else
          name="circle"
          size="40"
          unit="rpx"
          class="item-noselct-icon"
        ></icon>
        <text class="select-lab">全选</text>
      </view>
      <view class="price-box">
        <text class="price-lab">合计</text>
        <text class="price-icon">¥</text>
        <text class="price-val">234</text>
      </view>
      <button class="submit-btn" type="submit" @click="applyinvoice">申请发票</button>
    </view>
  </view>
  <view v-else-if="fillInStatus == 1" class="submit-wrap">
    <view class="fill-in-content">
      <view class="content-title">
        <text class="title-text">填写发票信息</text>
        <text class="title-text2">电子发票</text>
      </view>
      <view class="head-type">
        <text class="type-lab">抬头类型</text>
        <view class="type-list">
        <view class="type-item" :class="{'cur': selectHeadType == 1}" @click="slectheadType(1)">
          <icon v-if="selectHeadType == 1"
            class="select-type-icon"
            name="check"
            color="#fff"
            size="32"
            unit="rpx"
          ></icon>
          <text class="item-text">个人/事业单位</text>
        </view>
        <view class="type-item" :class="{'cur': selectHeadType == 2}" @click="slectheadType(2)">
          <icon v-if="selectHeadType == 2"
            class="select-type-icon"
            name="check"
            color="#fff"
            size="32"
            unit="rpx"
          ></icon>
          <text class="item-text">单位</text>
        </view>
        </view>
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon">*</text>
          <text class="lab-text">发票抬头</text>
        </view>
        <input type="text" placeholder="请填写发票抬头" val="invoiceHead" @input="fillInInvoiceHead"/>
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon"></text>
          <text class="lab-text">纳税人识别号</text>
        </view>
        <input type="text" placeholder="请填写纳税人识别号" val="discernNum" @input="fillInDiscernNum"/>
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon">*</text>
          <text class="lab-text">发票金额</text>
        </view>
        <input type="text" placeholder="请填写发票金额" val="invoicePrice" @input="fillIninvoIcePrice"/>
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon"></text>
          <text class="lab-text">发送邮箱</text>
        </view>
        <input type="text" placeholder="请填写接收填写邮箱" val="emailText" @input="fillIniEmailText"/>
      </view>
    </view>
    <view class="bottom-text">
      <text class="f"></text><text class="yellow"></text>
    </view>
    <button class="submit-fill-btn" type="submit" @click="submitInvoiceInfo">提交开票</button>
  </view>
</template>

<script>
import icon from "@/components/tui-icon/tui-icon.vue";
import invoiceitem from "@/components/invoice-item/invoice-item.vue";
export default {
  components: {
    invoiceitem,
    icon,
  },
  data() {
    return {
      fillInStatus: 0,
      pageNum: 1,
      allSelect: false,
      pageLoad: false,
      orderTotal: 10,
      getorderListLock: false,
      orderlist: [],
      selectHeadType: 1,
      invoiceHead: "",//抬头
      discernNum: "",//纳税人识别号
      invoicePrice: "",//发票金额
      emailText: "",//邮箱地址

    };
  },
  onLoad(options) {
    this.getList();
  },
  onShow() {},
  onReachBottom() {},
  methods: {
    getList() {
      var _self = this;
      if (_self.getorderListLock || _self.orderTotal == _self.orderlist) {
        return;
      }
      _self.getorderListLock = true;
      var param = {
        size: 10,
        page: _self.pageNum,
        order_status: "",
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
        _self.pageLoad = true;
      });
    },
    selectItem(item) {
      console.log(item);
    },
    setAllSelect() {
      this.allSelect = !this.allSelect;
    },
    applyinvoice(){//申请发票点击 
      this.fillInStatus = 1;
    },
    slectheadType(type){
      this.selectHeadType = type;
    },
    fillInInvoiceHead(e){
      this.invoiceHead = e.target.value;
    },
    fillInDiscernNum(e){
      this.discernNum = e.target.value;
    },
    fillIninvoIcePrice(e){
      this.invoicePrice = e.target.value;
    },
    fillIniEmailText(e){
      this.emailText = e.target.value;
    },
    submitInvoiceInfo(){
      var data = {
        head: this.invoiceHead,//抬头
        num: this.discernNum,//纳税人识别号
        price: this.invoicePrice,//发票金额
        email: this.emailText,//邮箱地址
      }
      console.log(data);
      this.fillInStatus = 0;
    }
  },
};
</script>

<style lang="scss">
html,
body {
  min-height: 100%;
  background-color: #f3f3f3;
}
.wrap {
  width: 100%;
  padding-bottom: 290rpx;
}
.empty-box {
  width: 100%;
  padding-top: 224rpx;
  image {
    display: block;
    margin: 0 auto;
  }
  .empty-text {
    display: block;
    width: 100%;
    font-size: 32rpx;
    color: #ff6c00;
    text-align: center;
    line-height: 44rpx;
  }
}
.invoice-list {
  width: 690rpx;
  margin: 0 auto;
}
.torecord-btn {
  display: flex;
  position: fixed;
  bottom: 298rpx;
  right: 0;
  height: 78rpx;
  padding: 0 20rpx;
  align-items: center;
  background-color: #fff;
  border-radius: 16rpx 0 0 16rpx;
  z-index: 100;
  box-shadow: 0px 0px 6rpx 0px rgba(0, 0, 0, 0.1);
  .btn-icon {
    display: block;
    width: 46rpx;
    height: 46rpx;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAmVBMVEUAAADn/fDj+/Hk+vHl+vHk+vDl+/Dl+vHl+vHl+/Hl+/Hg/PTk+vHk+vHk+vDk+/Dl/PPl+/Hl+vDk+vDk+vDj+fDk+vDh+O/k+vDk+/Dk++/k+vARyo3///8Uyo7R9efK9OQgzZQrz5pI1qeZ6M6t7Nh44b4/1aPc+OzW9+m379un69SL5cdX2a4x0ZzD8eGD48Jr3rdg27LqpBrgAAAAG3RSTlMADR/cVPJP4te46ArIv4l3HLGemcyEW0vVeXLAHKc0AAABgElEQVRIx5XV2XaCMBCA4ckCCIrgXjuKFa2Iu77/w1XKwcgksvw33nzmDMkJAC2Uk8GXhWh1BhMZQmXMdrGUa7OPuBs4qOUEXbOeddBYZ2aaY4QfG2kT8R5W1ONEC6xMcKprfKg062FtPbVBI2zQqNA25u2TtaEkxbxZrrvFfq+ihamfYv/zcQJsxvE708xryr3stCQ25Wg/uV/myR7/2xq4C8CxzE/LPIx0jiFIwte7vM3CwCX0sfns2AeX8GijiikfgCB8t1QdKP8Ci/DHGz9S7gHS2WNVRLlFOIly1Ia5HH9fnfXVO9oxqa6UCxjQ1bcqbXUXJu2OSbbhUwjbcA7gN+d+u+shn5w5rS4fzN958Y/o9aN4oL04LodTnN2R2/UcZVflkCguGHktbe4pYnqLdytEPCaPJ0zvyV5d7LwhNmgIRWxcr8cMXnGnTjscgPhK3eZjM+ZAYsOKp2SgZwszFjYYY3NPx17A4FNM+mXsS4JpfNp3hYVoCbc/1Z7wD6c9tJK3+pFTAAAAAElFTkSuQmCC)
      no-repeat center;
    background-size: 100%;
  }
  .btn-icon {
    margin-left: 10rpx;
    font-size: 24rpx;
    color: #000;
    line-height: 34rpx;
  }
}
.page-bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 146rpx;
  align-items: center;
  background: #fff;
  .select-box {
    display: flex;
    margin-left: 30rpx;
    align-items: center;
    .select-lab {
      margin-left: 10rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
  }
  .price-box {
    display: flex;
    margin-left: 52rpx;
    align-items: center;
    color: #ff6d00;
    .price-lab {
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
    .price-icon {
      margin: 0 6rpx 0 10rpx;
      font-size: 36rpx;
      line-height: 50rpx;
    }
    .price-val {
      font-size: 44rpx;
      line-height: 60rpx;
    }
  }
  .submit-btn {
    display: flex;
    width: 240rpx;
    height: 80rpx;
    font-size: 30rpx;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    background: #ff6c00;
    border-radius: 10rpx;
  }
}
.submit-wrap {
  width: 100%;
  padding-bottom: 220rpx;
  .fill-in-content {
    width: 690rpx;
    margin: 20rpx auto 0;
    padding: 30rpx;
    background: #fff;
    border-radius: 16rpx;
    box-sizing: border-box;
  }
  .content-title {
    display: flex;
    align-items: center;
    .title-text {
      font-size: 32rpx;
      line-height: 44rpx;
      color: #000;
      font-weight: bold;
    }
    .title-text2 {
      margin-left: 80rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
  }
  .head-type {
    margin-top: 30rpx;
    .type-lab {
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
    .type-list{
      display: flex;
      margin-top: 18rpx;
      align-items: center;
    }
    .type-item{
      display: flex;
      width: 270rpx;
      height: 80rpx;
      font-size: 28rpx;
      color: #000;
      align-items: center;
      justify-content: center;
      background: #F3F3F3;
      border-radius: 8rpx;
      &.cur{
        color: #fff;
        background: #ff6d00;
      }
      &:last-child{
        margin-left: 80rpx;
      }
    }
    .select-type-icon{
      margin-right: 10rpx;
    }
  }
.fill-in-item{
  margin-top: 38rpx;
  padding-bottom: 10rpx;
  border-bottom: 2rpx dashed #b1afaf;
  .item-lab{
    display: flex;
    align-items: center;
    .must-icon{
      display: block;
      width: 30rpx;
      font-size: 28rpx;
      color: #ff6d00;
    }
    .lab-text{
      font-size: 32rpx;
      line-height: 44rpx;
      color: #000;
      font-weight: bold;
    }
  }
  input{
    height: 40rpx;
    margin-top: 20rpx;
    padding-left: 30rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    .input-placeholder{
      color: #7B7B7B;
      font-size: 28rpx;
    }
  }
}
  .submit-fill-btn{
    display: flex;
    position: fixed;
    bottom: 94rpx;
    left: 32rpx;
    align-items: center;
    justify-content: center;
    width: 686rpx;
    height: 80rpx;
    font-size: 32rpx;
    color: #fff;
    border-radius: 50rpx;
    background-image: linear-gradient(45deg, #ff9b00 0%, #ff6c00 100%);
  }
}
</style>