<template>
	<view class="app-container">
		<view class="app-body">
			<view class="tui-flex">
				<view class="tui-center tui-flex-1">
					<picker
					  :value="value"
					  mode="multiSelector"
					  @change="picker"
					  @columnchange="columnPicker" :range="multiArray" class="pick"
					>
					 <text class="from" @click="pickerClick"> {{ addressData.receiverRegionName }}</text>
					</picker>
					
				</view>
				<view class="tui-center  tui-flex-1">
					<image class="from-to" src="../../static/from_to.png" mode="widthFix"></image>
				</view>
				<view class="tui-center tui-flex-1">
					<picker @change="bindPickerChange" :value="countryEnData.indexEn" :range="countryEnData.countryEn" range-key="name">
						<text class="to">{{ countryEnData.currentCountryName }}</text>
					</picker>
					
				</view>
			</view>
		</view>
		<view class="app-middle common">
			<tui-list-view color="#777" unlined="all">
				<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="25rpx" color="#000000">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-4">
							<text class="title">预估重量</text>
							<text class="must">(必填)</text>
						</view>
						<view class="tui-right tui-col-8 tui-middle">
							<text class="weight" :class="currentWeight > 0 ? 'cur' : ''" @click="calculate(1)" v-if="currentWeight > 0">{{ currentWeight }}</text>
							<text class="weight" @click="calculate(1)" v-if="currentWeight == 0">输入包裹预估重量</text>
							<text class="kg">KG</text>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="false" :unlined="true" :hover="false" padding="25rpx" color="#000000">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-4 row">
							<text class="title">预估体积</text>
						</view>
						<view class="tui-right tui-col-8 tui-middle">
							<text class="weight" :class="currentWeight > 0 ? 'cur' : ''" @click="calculate(2)" v-if="currentVolume > 0">{{ currentVolume }}</text>
							<text class="weight" @click="calculate(2)" v-if="currentVolume == 0">输入长、宽、高预估体积</text>
							<text class="kg">KG</text>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		<view class="app-result common" v-if="result == true">
			<tui-list-view color="#777" unlined="all">
				<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="25rpx" color="#000000">
					<view class="tui-item-box">
						<tui-icon name="transport" :size="24" color="#000000"></tui-icon>
						<text class="tui-list-cell_name">包裹</text>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="25rpx" color="#000000">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-8 row">
							<view class="row tui-algin-items">
								<view class="row-left">
									<text class="type">标准服务</text>
									<text class="money-tag">¥</text>
									<text class="money-data">0.00</text>
								</view>
								<view class="row-right">
									<text class="send-time">预计15-20个工作日到达</text>
								</view>
							</view>
						</view>
						<view class="tui-right tui-col-4 tui-middle">
							<text class="go-send" @click="goSend()">去下单</text>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="false" :unlined="true" :lineRight="true" :hover="false" padding="25rpx" color="#000000">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-8 row">
							<view class="row tui-algin-items">
								<view class="row-left">
									<text class="type">特惠服务</text>
									<text class="money-tag">¥</text>
									<text class="money-data">0.00</text>
								</view>
								<view class="row-right">
									<text class="send-time">预计15-20个工作日到达</text>
								</view>
							</view>
						</view>
						<view class="tui-right tui-col-4 tui-middle">
							<text class="go-send" @click="goSend()">去下单</text>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		<view class="app-text">
			<text class="text-title">运费规则说明：</text>
			<view class="row">
				<text class="text-middle-title">体积重计算方式</text>
				<text class="text-middle-desc">按照国际惯例，低密度的包裹，比较其实际重量，占用的空间通常较大，计算得出体积重量。体积重量和实际重量两者取最大者计费。</text>
				<text class="text-middle-title">计算公式</text>
				<text class="text-middle-desc">体积重量（Kg）=（长(cm) x 宽(cm) x 高(cm)） ÷ 6000</text>
				<text class="text-middle-desc">注意：体积重量计算结果会自动进位到0.5区间</text>
				<text class="text-middle-desc">例如：计算结果为1.01kg，自动进位到1.5kg</text>
				<text class="text-middle-title">物品尺寸限制</text>
				<text class="text-middle-desc">特惠服务：长+宽+高《 90cm，单位长度《 60cm</text>
				<text class="text-middle-desc">标准服务：长+宽+高《 300cm，单位长度《 120cm</text>
				<text class="text-middle-title">寄中国台湾</text>
				<text class="text-middle-desc">标准服务：长+宽+高《 150cm，单位长度《 140cm</text>
				<text class="text-middle-title">寄中国香港</text>
				<text class="text-middle-desc">标准服务：长+宽+高《 200cm，单位长度《 140cm</text>
				<text class="text-middle-desc">重量限制：《 30cm</text>
				<text class="text-middle-desc">以上测算为普货价格标准，如包裹内有特殊品（如食品、液体、电池等），寄送运费将比普通包裹贵10元/kg,请下单时如实申报</text>
			</view>
		</view>
		<uni-popup ref="showpopup" type="bottom" @change="change">
			<view class="weight-area">
				<view class="weight-area-title">
					<view class="tui-flex tui-align-right">
						<view class="tui-center tui-col-4">
							<text class="title">填写预估重量</text>
						</view>
						<view class="tui-right tui-col-4">
							<tui-icon name="shut" size="26" color="#7B7B7B" @click="cancel"></tui-icon>
						</view>
					</view>
				</view>
				<view class="weight-area-data" v-if="currentTab == 1">
					<view class="tui-flex tui-align-between">
						<view class="tui-left  tui-col-8 ">
							<text class="title">预估重量</text>
							<text class="desc">(包含外装的总重量)</text>
						</view>
						<view class="tui-right tui-col-4">
							<tui-numberbox :min="0" :step="0.1" :value="weight" @change="updateNumber"></tui-numberbox>
						</view>
					</view>
					<view class="weight-area_desc row">
						<text>请注意：</text>
						<text>1.实际计费重量以仓库核实为准</text>
						<text>2.体积重量和实际重量两者取最大者计费</text>
					</view>
				</view>
				<view class="volume-area-data" v-if="currentTab == 2">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-4 mr bg">
							<view class="tui-flex">
								<view class="tui-left tui-col-6">
									<input type="digit" placeholder="长" id="long" @input="input" v-model="lwh.long" class="placeholder-class" />
								</view>
								<view class="tui-right tui-col-6">
									<text class="cm">cm</text>
								</view>
							</view>
						</view>
						<view class="tui-left tui-col-4 mr bg">
							<view class="tui-flex">
								<view class="tui-left tui-col-6">
									<input type="digit" placeholder="宽" id="wide" @input="input" v-model="lwh.wide" class="placeholder-class" />
								</view>
								<view class="tui-right tui-col-6">
									<text class="cm">cm</text>
								</view>
							</view>
						</view>
						<view class="tui-left tui-col-4 mr bg">
							<view class="tui-flex">
								<view class="tui-left tui-col-6">
									<input type="digit" placeholder="高" id="height" @input="input" v-model="lwh.height" class="placeholder-class" />
								</view>
								<view class="tui-right tui-col-6">
									<text class="cm">cm</text>
								</view>
							</view>
						</view>
					</view>
					<view class="volume-area-result">
						<text class="big">预计体积重 = </text>
						<text class="big_data">{{ volume }}</text>
						<text class="big">KG</text>
					</view>
					<view class="weight-area_desc row">
						<text>温馨提示：</text>
						<text>当物品的体积较大而重量较轻时，在运输重就会把它的体积折算成重量来收取费用</text>
					</view>
				</view>
				<view class="weight-area_footer tui-center">
					<tui-button width="686rpx" height="80rpx" shape="circle" type="warning" @click="sure">提交</tui-button>
				</view>
			</view>
		</uni-popup>
		<tui-bottom-popup :show="popupShow"> </tui-bottom-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import tuiNumberbox from "@/components/tui-numberbox/tui-numberbox"
	export default {
		components: {
			uniPopup,
			tuiNumberbox
		},
		data() {
			return {
				showPickerStatus: false,
				popupShow: false,
				typeList: [],
				weight:0,//重量
				currentWeight:0,
				currentTab:1,
				volume:0,//体积
				currentVolume:0,
				lwh:{
					long:"",
					wide:"",
					height:""
				},
				result:false,
				countryEnData:{
					countryEn:[],
					currentCountryName:"",
					indexEn:0
				},
				addressData: {
				  receiverDistrictId: "",
				  receiverRegionName: "",
				  receiverRegionShow: "",
				  prov_id:"",
				  city_id:"",
				  dist_id:"",
				},
				selectList: [], // 接口返回picker数据,此处就直接使用本地测试数据
				multiArray: [], // picker数据
				provinces: [],
				citys: [],
				districts: [],
				value: [0, 0, 0],
			};
		},
		methods: {
			columnPicker: function (e, p) {
			  // 第几列 下标从0开始
			  let column = e.detail.column;
			  // 第几行 下标从0开始
			  let value = e.detail.value;
			  if (column === 0) {
			    this.provinceChoose(this.provinces[value].id);
			    this.value = [value, 0, 0];
			  } else if (column === 1) {
			    this.cityChoose(this.citys[value].id);
			    this.value = [this.value[0], value, 0];
			  }
			},
			toArr(object) {
			  let arr = [];
			  for (let i in object) {
			    arr.push(object[i].name);
			  }
			  return arr;
			},
			picker: function (e) {
			  let value = e.detail.value;
			  this.value = value;
			  // this.addressData.receiverCity = this.citys[value[1]].name;
			  console.log('object',this.districts[value[2]]);
			  // this.addressData.receiverDistrict = this.districts[value[2]].name;
			  this.addressData.receiverDistrictId = this.districts[value[2]].id;
			  this.addressData.prov_id = this.provinces[value[0]].id;
			  this.addressData.city_id = this.provinces[value[1]].id;
			  this.addressData.dist_id = this.provinces[value[2]].id;
			  this.addressData.receiverRegionName =
			    this.provinces[value[0]].name +
			    "" +
			    this.citys[value[1]].name;
			},
			provinceChoose: async function (stateId) {
			  let citys = await this.$api.getRegion({ parent_id: stateId });
			  this.citys = citys.data;
			  let districts = await this.$api.getRegion({
			    parent_id: this.citys[0].id,
			  });
			  this.districts = districts.data;
			  this.multiArray = [
			    this.toArr(this.provinces),
			    this.toArr(this.citys),
			    this.toArr(this.districts),
			  ];
			},
			cityChoose: async function (cityId) {
			  
			  let districts = await this.$api.getRegion({ parent_id: cityId });
			  this.districts = districts.data;
			  this.multiArray = [
			    this.toArr(this.provinces),
			    this.toArr(this.citys),
			    this.toArr(this.districts),
			  ];
			},
			pickerClick: async function () {
			  let provinces = await this.$api.getRegion();
			  this.provinces = provinces.data;
			  this.addressData.receiverRegionName = this.provinces[this.value[0]].name
			  let citysRes = await this.$api.getRegion({
			    parent_id: this.provinces[this.value[0]].id,
			  });
			  this.citys = citysRes.data;
			  this.addressData.receiverRegionName += this.citys[this.value[0]].name
			  let districts = await this.$api.getRegion({
			    parent_id: this.citys[this.value[1]].id,
			  });
			  this.districts = districts.data;
			  this.multiArray = [
			    this.toArr(this.provinces),
			    this.toArr(this.citys),
			    this.toArr(this.districts),
			  ];
			},
			togglePopup() {
			  this.popupShow = !this.popupShow;
			},
			navTo(e) {
				uni.navigateTo({
					url: '/pages/feedback/form?id=' + e.id + "&name=" + e.name
				});
			},
			goSend() {
				uni.navigateTo({
					url:"../send/index"
				})
			},
			calculate(index) {
				this.currentTab = index;
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
				})
			},
			cancel(type) {
				this.$refs['showpopup'].close()
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			updateNumber(e) {
				this.weight = e.value
			},
			sure() {
				if(this.currentTab == 1) {
					this.currentWeight = this.weight;
					this.result = true;
				} else {
					if(this.volume) {
						this.currentVolume = this.volume;
						this.result = true;
					}
				}
				this.$refs['showpopup'].close()
			},
			input(e) {
				if(e.target.id == "long") {
					this.lwh.long = e.detail.value;
				} else if(e.target.id == "wide") {
					this.lwh.wide = e.detail.value;
				} else if (e.target.id == "height") {
					this.lwh.height = e.detail.value;
				}
				if (this.lwh.long >0 && this.lwh.wide > 0 && this.lwh.height > 0) {
					let volume = (this.lwh.long * this.lwh.wide * this.lwh.height) / 6000;
					volume = volume*100;
					volume = Math.round(volume*100)/100;  
					this.volume = volume.toFixed(1)
					console.log(this.volume)
				}
				console.log(e);
			},
			async getCountry() {
				let EnRes = await this.$api.getCountryAddrList({is_china:2})
				if(EnRes.data) {
					this.countryEnData.countryEn = EnRes.data;
					this.countryEnData.currentCountryName = this.countryEnData.countryEn[0].name;
				}
				
			},
			bindPickerChange: function(e) {
				let country = this.countryEnData.countryEn;
				this.countryEnData.currentCountryName = country[e.detail.value].name;
				this.countryEnData.indexEn = e.detail.value
			},
		},
		async created() {
			this.getCountry()
		},
		mounted() {
		  this.pickerClick();
		},
	};
</script>

<style lang='scss' scoped>
	.app-container {
	  background: #f3f3f3;
	  padding: 15px;  
	  height: 100vh;
	  .common{
		  border-radius: 16rpx;
		  background-color: #FFFFFF;
		  overflow: hidden;
		  padding: 10rpx 20rpx;
		  margin-top: 20rpx;
	  }
	  .app-body{
		  border-radius: 16rpx;
		  background-color: #FFFFFF;
		  overflow: hidden;
		  padding: 20rpx 20rpx;
		  margin-bottom: 20rpx;
		  .from{
			  font-size: 32rpx;
		  }
		  .from-to{
			  width: 194rpx;
			  height: 20rpx;
		  }
		  .to{
			  font-size: 32rpx;
		  }
	  }
	  .app-middle{
		  .title{
			  font-size: 32rpx;
			  color: #000000;
		  }	  
		  .weight,.kg{
			  font-size: 28rpx;
			  color: #7B7B7B;
		  }
		  .must{
			  font-size: 28rpx;
			  color: #7B7B7B;
		  }
		  .cur{
			  color: #000000 !important; 
		  }
	  }
	  .app-result{
		 .type{
			 font-size: 36rpx;
			 font-weight: bold;
		 }
		 .money-tag{
			 color: #FF6C00;
			 font-size: 24rpx;
			 margin: 0rpx 10rpx 0rpx 20rpx;
			 
		 }
		 .money-data{
			 color: #FF6C00;
			 font-size: 40rpx;
			 font-weight: bold;
		 }
		 .send-time{
			 margin-top: 10rpx;
			 color: #7B7B7B;
			 font-size: 24rpx;
		 }
		 .go-send{
			 background-image: linear-gradient(to right, #ff9900, #ff7100);
			 padding: 10rpx 40rpx;
			 color: #fff;
			 height: 60rpx;
			 line-height: 60rpx;
			 border-radius: 30rpx;
			 font-size: 24rpx;
		 }
		 .tui-middle{
			 display: table-cell;
			 vertical-align: middle;
		 }
	  }
	  .app-text{
		  margin-top: 30rpx;
		  padding: 10rpx 20rpx;
		  .text-title{
			  font-size: 36rpx;
			  font-weight: bold;
			  margin: 40rpx 0rpx;
		  }
		  .text-middle-title{
			  margin: 10rpx 0rpx;
			  font-size: 26rpx;
			  color: #000000;
		  }
		  .text-middle-desc{
			  font-size: 22rpx;
			  color: #7B7B7B;
		  }
		  .row{
			  margin-top: 20rpx;
			  line-height: 30rpx;
			  
		  }
	  }
	}
	.weight-area{
		padding: 40rpx 20rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.weight-area-title{
			.title{
				font-size: 36rpx;
				font-weight: bold;
			}
		}
		.volume-area-data{
			margin: 20rpx 0rpx;
			.volume-area-result{
				margin: 20rpx;
				.big{
					font-size: 40rpx;
					color: #7B7B7B;
				}
				.big_data{
					font-size: 40rpx;
					color: #000000;
					margin: 0rpx 5rpx;
				}
			}
		}
		.weight-area-data{
			margin: 20rpx 0rpx;
			.title{
				font-size: 28rpx;
			}
			.desc{
				font-size: 28rpx;
				color: #7B7B7B;
			}
			
		}
		.weight-area_desc{
			margin-top: 20rpx;
			background-color: rgba(255,109,0,.1);
			border-radius: 8rpx;
			overflow: hidden;
			padding: 15rpx;
			text{
				color: #FF6D00;
				font-size: 22rpx;
			}
		}
	}
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #7B7B7B;
	}
	.cm{
		color: #7B7B7B;
		font-size: 26rpx;
	}
	.row{
		display: flex;
		
		flex-direction: column;
	}
	.tui-right{
		text-align: right;
	}
	.bg{
		background-color: #f3f3f3;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;
	}
	.mr {
		margin-right: 30rpx
	}
	.placeholder-class{
		padding-left: 10rpx;
	}
</style>
