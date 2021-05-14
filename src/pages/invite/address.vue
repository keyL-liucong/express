<template>
	<view class="app-container">
		<view class="app-body">
			<view class="app-body-tab">
				<view class="tui-flex tui-align-between">
					<view class="tui-center tui-col-6" :class="currentTab == 1 ? 'tab-active-left' : 'tab-left'" @click="tapTab(1)">国际</view>
					<view class="tui-center tui-col-6" :class="currentTab == 2 ? 'tab-active-right' : 'tab-right'" @click="tapTab(2)">港台地址</view>
				</view>
			</view>
			<view class="app-body-wrapp">
				<view class="app-body-wrapp_head">
					<view class="tui-flex tui-align-between">
						<view class="tui-center tab-active tui-col-4">
							<text class="get">收</text>
							<text class="get_address">收件地址</text>
						</view>
						<view class="tui-center tab-active-no tui-col-4">
							<text class="clear">清空</text>
						</view>
					</view>
				</view>
			</view>
			<view class="app-body-data">
				<tui-list-view color="#777" unlined="all" v-if="currentTab == 1">
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">姓名</text>
								<text class="en">Name</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请使用英文输入" v-model="postEnData.realname" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">国家/地区</text>
								<text class="en">County/Reguon</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<picker @change="bindPickerChange" :value="indexEn" :range="countryEn" range-key="name">
									<view class="uni-input">{{ currentCountryName }}</view>
								</picker>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">境外电话</text>
								<text class="en">Phone</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<view class="tui-flex">
									<view class="tui-center tui-col-2 mobile_code">
										<input placeholder="区号" v-model="postEnData.mobile_code" />
									</view>
									<view class="tui-center tui-col-10">
										<input placeholder="电话号码" v-model="postEnData.mobile" />
										
									</view>
								</view>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">邮编</text>
								<text class="en">Zip Code</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请输入邮编" v-model="postEnData.zipcode" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">州(省)</text>
								<text class="en">State</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<picker @change="bindPickerStateChange" :value="state.stateIndex" :range="state.stateData" range-key="name">
									<view class="uni-input">{{ state.stateName }}</view>
								</picker>
								<!-- <input placeholder="请选择" /> -->
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">详细地址</text>
								<text class="en">Phone</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请使用英文输入(精确到门牌号)" v-model="postEnData.address" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">公司名称</text>
								<text class="en">Company Name</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="(选填)如: 赫德 CO,LTD" v-model="postEnData.company_name" />
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
				
				<tui-list-view color="#777" unlined="all" v-if="currentTab == 2">
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">姓名</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请输入名字" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">地区</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请选择地区" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">电话</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请输入电话号码" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">邮编</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请输入邮编" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">城市</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请选择" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">详细地址</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="精确到门牌号" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">公司名称</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="(选填)" />
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
			</view>
		</view>
		<view class="app-bottom">
			<view class="tui-center">
				<tui-button margin="0 20rpx 26rpx 0" type="green" width="368rpx" height="90rpx" :size="32" @click="submit">确定</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				currentTab: 1,
				indexEn:'',
				currentCountryName:"请选择",
				countryZh:[],
				countryEn:[],
				state:{
					stateIndex:"",
					stateName:"请选择",
					stateData:[]
				},
				postEnData:{
					realname:"",
					mobile:"",
					mobile_code:"",
					country_id:"",
					is_china:0,
					city_id:"",
					state_id:"",
					zipcode:"",
					address:"",
					company_name:"",
				}
			};
		},
		methods: {
			async submit() {
				if(this.currentTab == 1) {
					let data = this.postEnData;
					let _this = this;
					if(!data.realname) {
						this.$toast("请填写收货人姓名");
						return;
					}
					if(!data.country_id) {
						this.$toast("请选择国家");
						return;
					}
					if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.mobile)) {
					  this.$toast("请输入正确的手机号码");
					  return;
					}
					if(!data.mobile_code) {
						this.$toast("请输入电话区号");
						return;
					}
					if(!data.zipcode) {
						this.$toast("请输入邮政编码");
						return;
					}
					
					if (!data.address) {
					  this.$toast("请填写详细地址信息");
					  return;
					}
					uni.showLoading({
						title:"保存中"
					})
					await this.$api.addReceivedAddr(data).then(function(res) {
						uni.hideLoading();
						if(res.status == 1) {
							_this.$toast("保存成功")
						} else {
							_this.$toast("保存失败");
						}
					})
				}
			},
			tapTab(e) {
				if(e == this.currentTab) {
					return;
				}
				this.currentTab = e;
			},
			bindPickerStateChange(e) {
				
				if(!this.postEnData.country_id) {
					this.$toast("请选择国家");
					return;
				}
				let state = this.state.stateData;
				this.state.stateName = state[e.detail.value].name
				this.postEnData.state_id = state[e.detail.value].id
				
			},
			bindPickerChange: function(e) {
				let country = this.countryEn;
				this.currentCountryName = country[e.detail.value].name;
				this.postEnData.country_id = country[e.detail.value].id;
				this.indexEn = e.detail.value
				this.getState(this.postEnData.country_id);
			},
			async getState(country_id) {
				let res = await this.$api.getRegionEnAddr({country_id:country_id})
				console.log(res);
				if(res.data) {
					this.state.stateData = res.data;
				}
				
			},
			async getCountry() {
				let EnRes = await this.$api.getCountryAddrList({is_china:2})
				if(EnRes.data) {
					this.countryEn = EnRes.data;
				}
				let ZhRes = await this.$api.getCountryAddrList({is_china:1})
				if(ZhRes.data) {
					this.countryZh = ZhRes.data;
				}
			}
		},
		async created() {
			this.getCountry()
		},
		mounted() {},
	};
</script>
<style lang='scss' scoped>
	.app-container {
		background: #f3f3f3;
		padding: 15rpx;
		height: 100vh;

		.app-body {
			background-color: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;

			.app-body-tab {
				height: 96rpx;
				line-height: 104rpx;
				background-color: #FFF0E5;

				.tab-active-left {
					border-top-right-radius: 20rpx;
					background-color: #FFFFFF;
				}
				.tab-active-right{
					border-top-left-radius: 20rpx;
					background-color: #FFFFFF;
				}
				
			}

			.app-body-wrapp_head {
				margin: 20rpx 20rpx;

				.get {
					background-color: #FF6D00;
					padding: 6rpx;
					color: #FFFFFF;
					font-size: 30rpx;
					margin-right: 30rpx;
				}

				.get_address {
					color: #000000;
					font-size: 30rpx;
				}

				.clear {
					color: #7B7B7B;
					font-size: 30rpx;
					text-align: right;
				}
			}

			.app-body-data {
				.zh {
					color: #000000;
					font-size: 28rpx;
				}

				.en {
					color: #7B7B7B;
					font-size: 24rpx;
				}

				.tui-middle {
					vertical-align: middle;
				}
			}
		}
		.app-bottom{
			margin-top: 60rpx;
		}
	}

	.row {
		display: flex;
		flex-direction: column;
	}
	.mobile_code{
		border-right: 2rpx #7B7B7B solid;
	}
</style>
