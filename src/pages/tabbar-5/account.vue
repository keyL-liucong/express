<template>
	<view class="app-container">
		<view class="top-part">
			<view class="center-part-wrap">
				<view class="center-part">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-7">
							<text class="allowed-money">可用余额</text>
							<text class="withdraw-action">申请提现</text>
						</view>
						<view class="tui-right tui-col-5">
							<text class="pay-pass">支付密码管理</text>
						</view>
					</view>
					
					<view class="tui-flex tui-align-between mt20 hl60">
						<view class="tui-left tui-col-5">
							<text class="money-tag">¥</text>
							<text class="money-data">0.00</text>
						</view>
						<view class="tui-right tui-col-5">
							<text class="chongzhi">充值</text>
						</view>
					</view>
					<view class="tui-flex tui-align-between mt20">
						<view class="tui-left tui-col-5">
							<text class="money-alert">含不可提现：0.00</text>
						</view>
						<view class="tui-right tui-col-5">
							<text class="money-alert">含推荐收益：0.00</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="app-body">
			<view class="body-tab">
				<tui-tabs unlined="true" sliderWidth="400" sliderBgColor="#FF6C00" selectedColor="#FF6C00" color="##000000" :tabs="tabs" itemWidth="50%" :currentTab="currentTab" @change="change"></tui-tabs>
			</view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scroll="scroll" class="scroll-Y" @scrolltolower="lower">
				<tui-list-view color="#777" unlined="all">
				  <tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000" v-for="(item, index) in dataList" :key="index">
				    <view class="tui-flex tui-align-between">
				    	<view class="tui-left tui-col-4">{{ item.money_text }}</view>
				    	<view class="tui-right tui-col-4">+{{ item.money }}</view>
				    </view>
				  </tui-list-cell>
				</tui-list-view>
			</scroll-view>
			<view class="item-list-wrap">
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import tuiTabs from "../../components/tui-tabs/tui-tabs";
	export default {
		components: {
			tuiTabs
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				tabs: [{
					name: "支出"
				}, {
					name: "收入"
				}],
				currentTab:0,
				dataList:[],
				page:1
			};
		},
		methods: {
			navTo(e) {
			  uni.navigateTo({
				  url: '/pages/tabbar-5/warehouse_detail?id='+e.id+"&name="+e.name
			  });
			},
			change(e) {
				console.log(e);
				this.currentTab = e.index;
			},
			lower(e) {
				console.log(e);
			},
			scroll: function(e) {
				
				this.old.scrollTop = e.detail.scrollTop
			},
			async getList() {
				let getData = {
					type:this.currentTab + 1,
					page:this.page
				};
				let res = await this.$api.accountRecord(getData)
				if(res.data && res.data.list.length > 0) {
					this.dataList.push(res.data.list);
				}
			}
		},
		async created() {
			this.getList();
		},
		onLoad() {
			uni.setNavigationBarTitle({
			    title: '我的余额'
			});
		}
	};
</script>

<style lang='scss' scoped>
	page{
		background: #F3F3F3 !important;
	}
	.app-container{
		background: #F3F3F3;
		height: 100vh;
		.top-part {
			height: 125px;
			background-image: linear-gradient(to right, #ff9900, #ff7100);
			border-bottom-right-radius: 50rpx;
			border-bottom-left-radius: 50rpx;
			color: #fff;
			padding-top: 100rpx;
		}
	}
	.center-part-wrap{
		height: 285rpx;
		width: 640rpx;
		margin: 60rpx 50rpx 0rpx 50rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url("../../static/account.png");
		.center-part{
			padding: 30rpx;
			.allowed-money{
				font-size: 28rpx;
				color: #000000;
				font-weight: 500;
			}
			.withdraw-action{
				color: #707070;
				font-size: 20rpx;
				border-radius: 20rpx;
				margin-left: 30rpx;
				border: 1rpx solid #707070;
				padding: 4rpx 10rpx;
			}
			.pay-pass{
				color: #FF6C00;
				font-size: 28rpx;
				font-weight: 500;
			}
			.money-tag{
				color: #FF6C00;
				font-size: 36rpx;
				font-weight: 600;
			}
			.money-data{
				color: #FF6C00;
				font-size: 70rpx;
				margin-left: 12rpx;
				font-weight: 600;
			}
			.chongzhi{
				margin-top: 20rpx;
				color: #FFFFFF;
				background-color: #FF6C00;
				padding: 10rpx 60rpx;
				border-radius: 10rpx;
			}
			.money-alert{
				color: #7B7B7B;
				font-size: 24rpx;
			}
		}
	}
	.app-body{
		margin-top: 150rpx;
		/* margin-left: 20rpx; */
		/* margin-right: 20rpx; */
		padding: 0rpx 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
		.body-tab{
			margin-right:20rpx;
		}
		.tui-right{
			text-align: right;
		}
	}
	
	.mt20{
		margin-top: 40rpx;
	}
	.hl60{
		line-height: 60rpx;
	}
	.scroll-Y {
		height: 700rpx;
	}
</style>
