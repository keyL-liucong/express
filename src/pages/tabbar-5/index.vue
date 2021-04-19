<template>
    <view class="app-container">
        <view class="top-part">
            <view class="info-box">
                <view class="header-img">
                    <image src="../../static/index-1.png" mode="" />
                </view>
                <view class="info-line">
                    <view class="name">大表哥</view>
                    <view class="mobile">17688773132</view>
                    <view class="code">
                        <view class="code-left">会员编号：123465789</view>
                        <view class="code-right">
                            <text>修改</text>
                            <image src="../../static/white-arrow.png" mode="" />
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    methods: {},
    created() {},
    mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
    .top-part {
        height: 500rpx;
        background-image: linear-gradient(to right, #ff9900, #ff7100);
        border-bottom-right-radius: 50rpx;
        border-bottom-left-radius: 50rpx;
        color: #fff;
        padding-top: 100rpx;
        padding-left: 44rpx;
        .info-box {
            display: flex;
            align-items: center;
            .header-img {
                width: 122rpx;
                height: 122rpx;
                border-radius: 65rpx;
                margin-top: 28rpx;
                margin-right: 22rpx;
                border: 6rpx solid #ffc880;
                image {
                    width: 100%;
                    height: 100%;
                }
            }
            .info-line {
                width: calc(100% - 160rpx);
                padding-top: 12rpx;
                padding-right: 30rpx;
                .name{
                    font-size: 40rpx;
                }
                .code {
                    display: flex;
                    justify-content: space-between;
                    image {
                        width: 12rpx;
                        height: 20rpx;
                    }
                }
            }
        }
    }
}
</style>