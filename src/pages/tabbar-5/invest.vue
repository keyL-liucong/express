<template>
	<view class="app-container">
		<view class="app-body">
			<view class="app-body-tab">
				<view class="tui-flex">
					<view class="tui-center tui-flex-1">
						<text class="tab_text">充值活动</text>
					</view>
					<view class="tui-center tui-right-active tui-flex-1">
						<text class="tab_text cur">普通充值</text>
					</view>
				</view>
			</view>
			<view class="app-body-data">
				<text class="app-body-data_text">请选择需要充值的金额</text>
				<view class="app-body-data_a">
					
				</view>
				<view class="tui-flex app-body-data_b">
					<view class="tui-center app-body-data_b_body cur ">
						<text class="dollar">¥</text>
						<text class="dollar-text">100</text>
					</view>
					<view class="tui-center app-body-data_b_body ml20">
						<text class="dollar">¥</text>
						<text class="dollar-text">300</text>
					</view>
					<view class="tui-center app-body-data_b_body ">
						<text class="dollar">¥</text>
						<text class="dollar-text">500</text>
					</view>
					<view class="tui-center app-body-data_b_body ml20">
						<text class="dollar">¥</text>
						<text class="dollar-text">800</text>
					</view>
				</view>
			</view>
		</view>
		<view class="app-other">
			<text class="app-other_text">输入其他充值金额</text>
			<view class="app-other-data row">
				<text class="app-other-data_text">¥</text>
				<input placeholder="请输入其他充值金额" />
			</view>
		</view>
		
		<text class="app-bottom_text">支付方式</text>
		<view class="app-bottom">
			<view class="tui-flex">
				<view class="tui-left tui-col-8">
					<tui-icon name="wechat" size="30" color="#28C445"></tui-icon>
					<text>微信支付</text>
				</view>
				<view class="tui-right tui-col-4">
					<tui-icon name="circle-fill" color="#28C445" size="24"></tui-icon>
				</view>
			</view>
		</view>
		<view class="app-alert">
			<tui-icon name="news" size="20" color="#FF4848"></tui-icon>
			<view class="app-alert-text">
				<text>通过本页面充值可享受额外返现，充值本金及返现金额不支持</text>
				<text>后续提现，可用于支付包裹运费及增值服务费，可叠加优惠券</text>
				<text>所以。</text>
			</view>
			
		</view>
		<view class="bottom-btn-box">
		    <tui-button width="100%" margin="0 auto" height="80rpx" shape="circle" type="warning" @click="submit">提交充值</tui-button>
		</view>
	</view>
</template>

<script>
</script>

<style lang='scss' scoped>
	.app-container {
		background: #f3f3f3;
		padding: 15px;  
		height: 100vh;
		.app-body{
			border-radius: 16rpx;
			background-color: #FFFFFF;
			.app-body-tab{
				height: 104rpx;
				line-height: 104rpx;
				.tui-left-active{
					background-color: #FFF0E5;
					border-bottom-right-radius: 16rpx;
					.cur{
						font-size: 28rpx;
						color: #000000;
						font-weight: bold;
					}
				}
				
				.tui-right-active{
					background-color: #FFF0E5;
					border-bottom-left-radius: 16rpx;
					.cur{
						font-size: 28rpx;
						color: #000000;
						font-weight: bold;
					}
				}
				.tab_text{
					font-size: 32rpx;
					color: #FF6D00;
				}
			}
			.app-body-data{
				padding: 20rpx 30rpx;
				.app-body-data_text{
					font-size: 24rpx;
					color: #000000;
					font-weight: bold;
				}
				.app-body-data_b{
					flex-wrap: wrap;
					padding-bottom: 20rpx;
					.cur{
						background-color: rgba(255,109,0,0.1) !important;
						color: #FF6D00;
					}
					.app-body-data_b_body{
						height: 120rpx;
						margin-top: 40rpx;
						width: 300rpx;
						border-radius: 16rpx;
						background-color: #F3F3F3;
						.dollar{
							font-weight: bold;
							font-size: 36rpx;
							margin-right: 4rpx;
						}
						.dollar-text{
							font-weight: bold;
							font-size: 44rpx;
						}
					}
				}
			}
			
		}
		.app-other{
			border-radius: 16rpx;
			margin: 40rpx 0rpx;
			padding: 20rpx 30rpx;
			background-color: #FFFFFF;
			.app-other_text{
				font-size: 32rpx;
				color: #000000;
				font-weight: bold;
			}
			.app-other-data{
				margin-top: 36rpx;
				.app-other-data_text{
					margin-right: 15rpx;
					font-size: 36rpx;
					font-weight: bold;
				}
			}
			.row{
			  display: flex;
			  align-items: center;
			}
		}
		.app-alert{
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			.app-alert-text{
				font-size: 24rpx;
				color: #FF4848;
			}
		}
		.app-bottom{
			border-radius: 16rpx;
			padding: 20rpx 30rpx;
			margin-top: 20rpx;
			background-color: #FFFFFF;
			.tui-left{
				display: inline-flex;
				align-items: center;
				text{
					margin-left: 10rpx;
				}
			}
		}
	}
	
	.tui-right{
		text-align: right;
	}
	.ml20{
		margin-left: 40rpx;
	}
	.bottom-btn-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 20rpx;
	}
	.tui-input{
		text-align: right;
	}
</style>
