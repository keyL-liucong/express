<template>
	<view class="app-container">
		<view class="app-body">
			<view class="tui-flex">
				<view class="tui-center tui-flex-1">
					<text class="from">广州深圳</text>
				</view>
				<view class="tui-center  tui-flex-1">
					<image class="from-to" src="../../static/from_to.png" mode="widthFix"></image>
				</view>
				<view class="tui-center  tui-flex-1">
					<text class="to">美国纽约</text>
				</view>
			</view>
		</view>
		<view class="app-middle common">
			<tui-list-view color="#777" unlined="all">
				<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="25rpx" color="#000000">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-4 row">
							<text class="title">预估重量</text>
							<text class="must">(必填)</text>
						</view>
						<view class="tui-right tui-col-8 tui-middle">
							<text class="weight">输入包裹预估重量</text>
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
							<text class="weight">输入长、宽、高预估体积</text>
							<text class="kg">KG</text>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		
		<view class="app-result common">
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
							<text class="go-send">去下单</text>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				typeList: []
			};
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: '/pages/feedback/form?id=' + e.id + "&name=" + e.name
				});
			}

		},
		async created() {
			let res = await this.$api.getComplaintType();
			if (res.data && res.data.length > 0) {
				this.typeList = res.data;
			}
		},
		mounted() {},
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
		  padding: 20rpx 40rpx;
		  margin-bottom: 20rpx;
		  .from{
			  font-size: 36rpx;
		  }
		  .from-to{
			  width: 194rpx;
			  height: 20rpx;
		  }
		  .to{
			  font-size: 36rpx;
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
	.row{
		display: flex;
		
		flex-direction: column;
	}
	.tui-right{
		text-align: right;
	}
</style>
