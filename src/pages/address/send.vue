<template>
  <view class="content">
    <view class="row b-b">
      <text class="tit">联系人</text>
      <input
        class="input"
        type="text"
        v-model="addressData.name"
        placeholder="收货人姓名"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">手机号</text>
      <input
        class="input"
        type="number"
        v-model="addressData.phoneNumber"
        placeholder="收货人手机号码"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">省市区</text>
      <!-- <uni-popup ref="popup" type="bottom">
        <view class="popup">
          <view class="picker-btn">
            <view class="left" @click="cancel">取消</view>
            <view class="right" @click="confirm">确定</view>
          </view>
          <picker-view
            :indicator-style="indicatorStyle"
            :value="valueArr"
            @change="bindChange"
          >
            <picker-view-column>
              <view
                class="item"
                v-for="(item, index) in province"
                :key="index"
                >{{ item.provinceName }}</view
              >
            </picker-view-column>
            <picker-view-column v-if="province[valueArr[0]]">
              <view
                class="item"
                v-for="(item, index) in province[valueArr[0]].children"
                :key="index"
                >{{ item.name }}</view
              >
            </picker-view-column>
            <picker-view-column v-if="province[valueArr[0]]">
              <view
                class="item"
                v-for="(item, index) in province[valueArr[0]].children[
                  valueArr[1]
                ].children"
                :key="index"
                >{{ item.name }}</view
              >
            </picker-view-column>
          </picker-view>
        </view>
      </uni-popup> -->
      <!-- <text  class="input">
				{{addressData.province}} {{addressData.city}} {{addressData.region}}
			</text>
			<text class="yticon icon-shouhuodizhi" @click="chooseLocation"></text> -->
    </view>
    <view class="row b-b">
      <text class="tit">门牌号</text>
      <input
        class="input"
        type="text"
        v-model="addressData.detailAddress"
        placeholder="楼号、门牌"
        placeholder-class="placeholder"
      />
    </view>

    <view class="row default-row">
      <text class="tit">设为默认</text>
      <switch
        :checked="addressData.defaultStatus === 1"
        color="#fa436a"
        @change="switchChange"
      />
    </view>
    <button class="add-btn" @click="confirm">提交</button>
      <uni-popup ref="popup" type="bottom">
        <view class="popup">
          <view class="picker-btn">
            <view class="left" @click="cancel">取消</view>
            <view class="right" @click="confirm">确定</view>
          </view>
          <picker-view
            :indicator-style="indicatorStyle"
            :value="valueArr"
            @change="bindChange"
          >
            <picker-view-column>
              <view
                class="item"
                v-for="(item, index) in province"
                :key="index"
                >{{ item.provinceName }}</view
              >
            </picker-view-column>
            <picker-view-column v-if="province[valueArr[0]]">
              <view
                class="item"
                v-for="(item, index) in province[valueArr[0]].children"
                :key="index"
                >{{ item.name }}</view
              >
            </picker-view-column>
            <picker-view-column v-if="province[valueArr[0]]">
              <view
                class="item"
                v-for="(item, index) in province[valueArr[0]].children[
                  valueArr[1]
                ].children"
                :key="index"
                >{{ item.name }}</view
              >
            </picker-view-column>
          </picker-view>
        </view>
      </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      indicatorStyle: `height: ${Math.round(
        uni.getSystemInfoSync().screenWidth / (750 / 100)
      )}px;`,
      valueArr: [0, 0, 0], // 用于判断当前滑动的是哪一列
      province: [], // 数据列表
      manageType: "add",
      addressData: {
        name: "",
        phoneNumber: "",
        province: "在地图选择",
        city: "",
        region: "",
        address: "",
        detailAddress: "",
        defaultStatus: 0,
      },
    };
  },
  async onLoad(option) {           
    console.log(this.$api.getRegion());
    var _self = this;
    // let title = '新增收货地址';
    if (option.type === "edit") {
      // title = "编辑收货地址";
      Api.methods
        .getReceiptInfoById({ id: option.addressId })
        .then(function (res) {
          _self.addressData = res.data.data;
        });
    }
    this.manageType = option.type;
    // uni.setNavigationBarTitle({
    //   title,
    // });
  },
  methods: {
    switchChange(e) {
      this.addressData.defaultStatus = e.detail.value ? 1 : 0;
    },
    // 加载省数据
    initLoadArea() {
      loadAddr().then((res) => {
        if (res.status) {
          this.province = res.data;
          this.loadCity(this.province[0].id);
        }
      });
    },
    // 加载市数据
    loadCity(parentId) {
      const params = {
        parent_id: parentId,
      };

      loadChildAddr(params).then((res) => {
        if (res.status) {
          if (this.province[this.valueArr[0]].children === undefined) {
            this.$set(this.province[this.valueArr[0]], "children", []);
            res.data.forEach((item) => {
              this.province[this.valueArr[0]].children.push(item);
            });
            this.loadArea(
              this.province[this.valueArr[0]].children[this.valueArr[1]].id
            );
          }
        }
      });
    },
    // 加载区（县）数据
    loadArea(parentId) {
      const params = {
        parent_id: parentId,
      };
      loadChildAddr(params).then((res) => {
        if (res.status) {
          this.area = res.data;
          if (
            this.province[this.valueArr[0]].children[this.valueArr[1]]
              .children === undefined
          ) {
            this.$set(
              this.province[this.valueArr[0]].children[this.valueArr[1]],
              "children",
              []
            );
            res.data.forEach((item) => {
              this.province[this.valueArr[0]].children[
                this.valueArr[1]
              ].children.push(item);
            });
          }
        }
      });
    },
    toggleTab() {
      this.$refs.popup.open();

    },
    cancel() {
      this.$refs.popup.close();
    },
    bindChange(e) {
			const val = e.detail.value;
			if (this.valueArr[0] !== val[0]) {
				this.loadCity(this.province[val[0]].id)
			} else if (this.valueArr[1] !== val[1]) {
				this.loadArea(this.province[val[0]].children[val[1]].id)
			}
			this.valueArr = val
		},
    //地图选择地址
    chooseLocation() {
      var _self = this;
      uni.chooseLocation({
        success: (data) => {
          console.log(JSON.stringify(data));
          //#ifndef APP-PLUS
          Api.methods.addressResolution(data).then(function (res) {
            var list = res.data.data;
            if (list.length > 0) {
              _self.addressData.province = list[0].province;
              _self.addressData.city = list[0].city;
              _self.addressData.region = list[0].county;
              _self.addressData.detailAddress = list[0].village + data.name;
            } else {
              _self.addressData.province = "";
              _self.addressData.city = data.address;
            }
          });
          //#endif
          //#ifdef APP-PLUS
          Api.methods.addressResolution(data).then(function (res) {
            var list = res.data.data;
            if (list.length > 0) {
              _self.addressData.province = list[0].province;
              _self.addressData.city = list[0].city;
              _self.addressData.region = list[0].county;
              _self.addressData.detailAddress =
                data.name == "地图位置" ? list[0].village : data.name;
            } else {
              _self.addressData.province = "";
              _self.addressData.city = data.address;
            }
          });
          // _self.addressData.province="";
          // _self.addressData.region=data.address;
          // _self.addressData.detailAddress=data.name;
          //#endif
        },
      });
    },

    //提交
    confirm() {
      var _self = this;
      let data = this.addressData;
      if (!data.name) {
        this.$toast("请填写收货人姓名");
        return;
      }
      // if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phoneNumber)){
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.phoneNumber)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      // if(!data.city){
      // 	this.$toast('请在地图选择所在位置');
      // 	return;
      // }
      if (!data.detailAddress) {
        this.$toast("请填写门牌号信息");
        return;
      }
      console.log(_self.manageType);
      if (_self.manageType === "add") {
        Api.methods.addReceipt(_self.addressData).then(function (res) {
          var result = res.data;
          if (result.code === 200) {
          } else {
            _self.$toast("添加失败，请重试");
          }
        });
      } else {
        Api.methods.upReceipt(_self.addressData).then(function (res) {
          var result = res.data;
          if (result.code === 200) {
          } else {
            _self.$toast("修改失败，请重试");
          }
        });
      }
      //this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
      this.$api.prePage().refreshList(data, this.manageType);
      this.$toast(`地址${this.manageType == "edit" ? "修改" : "添加"}成功`);
      setTimeout(() => {
        uni.navigateBack();
      }, 800);
    },
  },
};
</script>

<style lang="scss">
page {
  background: $page-color-base;
  padding-top: 16upx;
}
.popup {
  height: fit-content;
  width: 100%;
  background: #fff;
}

.picker-btn {
  display: flex;
  height: 100upx;
  width: 100%;
  line-height: 100upx;
  background: #fff;
  font-size: 34upx;
  z-index: 1;
  border-bottom: 1rpx solid #f8f8f8;

  .left {
    flex: 1;
    color: #0076ff;
    padding-left: 40upx;
    box-sizing: border-box;
  }

  .right {
    flex: 1;
    text-align: right;
    padding-right: 40upx;
    color: #fe4533;
    box-sizing: border-box;
  }
}

picker-view {
  width: 100%;
  height: 500rpx;
  display: relative;
}
.item {
  line-height: 100rpx;
  text-align: center;
}
.row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 30upx;
  height: 110upx;
  background: #fff;

  .tit {
    flex-shrink: 0;
    width: 120upx;
    font-size: 30upx;
    color: $font-color-dark;
  }
  .input {
    flex: 1;
    font-size: 30upx;
    color: $font-color-dark;
  }
  .icon-shouhuodizhi {
    font-size: 36upx;
    color: $font-color-light;
  }
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
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 690upx;
  height: 80upx;
  margin: 60upx auto;
  font-size: $font-lg;
  color: #fff;
  background-color: $base-color;
  border-radius: 10upx;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
  background-image: linear-gradient(to right, #ff9900, #ff7100);
}
</style>
