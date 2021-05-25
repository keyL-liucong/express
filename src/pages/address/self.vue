<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">选择国家</text>
			<picker :value="value" @change="countryPicker" :range="countryArray" class="pick" range-key="name">
				<text class="input">{{ postData.country }}</text>
			</picker>
		</view>
		<view class="row b-b" v-if="slefData.country_id != ''">
			<text class="tit">仓库代码</text>
			<picker :value="value" @change="statePicker" :range="stateArray" class="pick" range-key="name">
				<text class="input">{{ postData.code }}</text>
			</picker>
		</view>
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.realname" placeholder-class="placeholder"
				disabled="true" />
		</view>
		<view class="row b-b">
			<text class="tit">联系人电话</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder-class="placeholder"
				disabled="true" />
		</view>

		<view class="row b-b">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.address" placeholder-class="placeholder"
				disabled="true" />
		</view>
		<button class="add-btn" @click="sureSelf">选择自提点</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countryArray: [],
				stateArray: [],
				value: "",
				postData: {
					country: "选择国家",
					code: "仓库代码"
				},
				selfData: {
					country_id: "",
					code: "",
					state: "",
					city: "",
					address: "",
					mobile: "",
					zipcode: ""

				}
			};
		},
		async onLoad(option) {
			this.getCountry();
		},

		methods: {
			countryPicker(e) {
				let country = this.countryArray;
				this.selfData.country_id = country[e.detail.value];
			},
			async getCountry() {
				let countryData = await this.$api.getCountryAddrList({
					is_china: 2
				})
				this.countryArray = countryData.data;
			},
			sureSelf() {
				let _selfData = this.selfData;
				if(_selfData.country_id == "") {
					this.$toast('请选择国家');
					return;
				}
				if(_selfData.code == "") {
					this.$toast('请选择仓库代码');
					return;
				}
				
				let pages = getCurrentPages();
				let nowPage = pages[ pages.length - 1];
				let prevPage = pages[ pages.length - 2 ];
				prevPage.$vm.selfAddr = _selfData;
				uni.navigateBack({
					delta:1
				})
			}
		},
	};
</script>

<style lang="scss">
	.content {
		padding: 0 30rpx;
		background: #fff;
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
		border-bottom: 1px solid #F3F3F3;

		.tit {
			display: block;
			flex-shrink: 0;
			width: 150rpx;
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
