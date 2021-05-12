<template>
    <view class="app-container">
		<view class="app-body">
			<view class="body-step_1">
				
			</view>
			<view class="body-step_2"></view>
			<view class="body-step_3"></view>
			<view class="body-step_4"></view>
			<view class="body-step_5"></view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
			};
		},
		methods: {
		}
	};
</script>

<style lang='scss' scoped>
	page{
		height:100%;
	}
	.background {
		width: 100%;
		height: 100%;
		position:fixed; 
		background-size:100% 100%;
		z-index: -1;
	}
	.app-body{
		padding: 0rpx 20rpx;
		.body-step_1,.body-step_2,.body-step_3,.body-step_4,.body-step_5{
			background-color: #FFEED9;
			border-radius: 16rpx;
		}
	}
</style>
