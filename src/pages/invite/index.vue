<template>
	<view class="app-container">
		<view class="app-body">
			<view class="top-part">
				<view class="center-part-wrap tui-flex ">
					<view class="center-part-wrap_data tui-center tui-flex-1">
						<view class="title">剩余返现金额</view>
						<view class="money_block">
							<text class="money-tag">¥</text>
							<text class="money-data">0.00</text>
						</view>
						<view class="apply">申请提现</view>
					</view>
					<view class="center-part-wrap_data tui-center tui-flex-1">
						<view class="title">累计返现收益</view>
						<view class="money_block">
							<text class="money-tag">¥</text>
							<text class="money-data">0.00</text>
						</view>
						<view class="apply_hidden">xxx</view>
					</view>
				</view>
			</view>
			<view class="middle-part">
				<view class="middle-part-wrap tui-flex">
					<view class="middle-part-wrap_data tui-center tui-flex-1">
						<view class="middle-part-number">0</view>
						<view class="middle-part-text">已推荐好友</view>
					</view>
					<view class="middle-part-wrap_data tui-center tui-flex-1">
						<view class="middle-part-number">0</view>
						<view class="middle-part-text">累计返利订单</view>
					</view>
					<view class="middle-part-wrap_data tui-center tui-flex-1">
						<view class="middle-part-number">0</view>
						<view class="middle-part-text">累计返劵数</view>
					</view>
				</view>
			</view>
			<view class="middle-list">
				<view class="middle-list-tab"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	  components: {},
	  data() {
	    return {
	      typeList:[]
	    };
	  },
	  methods: {
	     navTo(e) {
	      uni.navigateTo({
	          url: '/pages/feedback/form?id='+e.id+"&name="+e.name
	      });
	    }
	
	  },
	  async created() {
	    let res = await this.$api.getComplaintType();
	    if(res.data && res.data.length > 0) {
	        this.typeList = res.data;
	    }
	  },
	  mounted() {},
	};
</script>

<style lang='scss' scoped>
	.app-container{
		background: #F3F3F3;
		height: 100vh;
		.app-body{
			padding: 20rpx 20rpx;
		}
		.top-part {
			height: 230rpx;
			width: 710rpx;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-image: url(../../static/invite_bg.png);
			.center-part-wrap{
				padding: 20rpx;
				vertical-align: middle;
			}
			.center-part-wrap_data{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content:center
				.title{
					font-size: 28rpx;
					color: #000000;
				}
				.money_block{
					margin: 20rpx 0rpx;
					.money-tag{
						font-size: 36rpx;
						color: #FF6D00;
						margin-right: 16rpx;
					}
					.money-data{
						font-size: 60rpx;
						color: #FF6D00;
					}
				}
				
				.apply{
					font-size: 24rpx;
					color: #707070;
				}
				.apply_hidden{
					font-size: 24rpx;
					color: #707070;
					opacity: 0;
					/* background-color: rgba(255,255,255,0); */
				}
			}
		}
		.middle-part{
			margin: 20rpx 0rpx;
			height: 152rpx;
			width: 710rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			.middle-part-wrap{
				align-items: center;
				justify-content:center;
				.middle-part-wrap_data{
					height: 152rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content:center;
					.middle-part-number{
						color: #FF6D00;
						font-size: 44rpx;
						font-weight: bold;
					}
					.middle-part-text{
						margin-top: 8rpx;
						font-weight: bold;
						color: #000000;
						font-size: 28rpx;
					}
				}
			}
		}
		.middle-list{
			background-color: #FFFFFF;
			border-radius: 16rpx;
			width: 710rpx;
			height: 700rpx;
		}
	}
</style>
