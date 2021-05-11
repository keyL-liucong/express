<template>
    <view class="app-container">
        <!-- 轮播图 -->
        <view class="tui-banner-box">
            <swiper
                :indicator-dots="true"
                :autoplay="true"
                :interval="5000"
                :duration="150"
                class="tui-banner-swiper"
                :circular="true"
                indicator-color="rgba(255, 255, 255, 0.8)"
                indicator-active-color="#fff"
            >
                <swiper-item v-for="(item, index) in bannerList" :key="index">
                    <image
                        :src="item.pic_url"
                        class="tui-slide-image"
                        mode="scaleToFill"
                    />
                </swiper-item>
                <!-- <swiper-item>
                    <image
                        :src="'https://zhizuxia-sit.obs.cn-north-1.myhuaweicloud.com/tgmini-img/share-2.png'"
                        class="tui-slide-image"
                        mode="scaleToFill"
                    />
                </swiper-item>
                <swiper-item>
                    <image
                        :src="'../../static/tab-1-selected.png'"
                        class="tui-slide-image"
                        mode="scaleToFill"
                    />
                </swiper-item> -->
            </swiper>
        </view>
		<!-- board -->
		<view class="tui-notice-board">
		    <view class="tui-rolling-news">
		        <tui-icon
		            name="news-fill"
		            :size="28"
		            color="#FF4848"
		        ></tui-icon>
		        <swiper
		            vertical
		            autoplay
		            circular
		            interval="3000"
		            class="tui-swiper"
		        >
		            <swiper-item
		                v-for="(item, index) in tipsList"
		                :key="index"
		                class="tui-swiper-item"
		            >
		                <view class="tui-news-item" @tap="detail">{{
		                    item.text
		                }}</view>
		            </swiper-item>
		        </swiper>
		    </view>
		</view>
		<view class="space"></view>
        <view class="banner-part">
            <view class="piece bg-1">
                <view class="desc-box"  @click="navTo('/pages/send/index')">  
                    <view class="left left-1"></view>
                    <view class="right">
                        <view class="font-wight">上门取件</view>
                        <view class="font-size">2小时上门取件</view>   
                    </view>
                </view>
            </view>
            <view class="piece bg-2">
                <view class="desc-box">
                    <view class="left left-2"></view>
                    <view class="right">
                        <view  class="font-wight">自寄到仓</view>
                        <view class="font-size">2小时上门取件</view>
                    </view>
                </view>
            </view>
            <view class="piece bg-3">
                <view class="desc-box">
                    <view class="left left-3"></view>
                    <view class="right">
                        <view  class="font-wight">推荐他人</view>
                        <view class="font-size">下单拿现金</view>
                    </view>
                </view>
            </view>
            <view class="piece bg-4">
                <view class="desc-box">
                    <view class="left left-4"></view>
                    <view class="right">
                        <view  class="font-wight">运费与实效</view>
                        <view class="font-size">透明正规准时</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- write part -->
        <view class="write-address-part">
            <text>海外地址不会填？邀请收件人填写</text>  
            <button @click="navTo('/pages/feedback/form')" style="padding:0px 9px;font-size: 14px;">邀请填写</button>
        </view>
		<view class="app-customer">
			<button open-type="contact" class="app-customer_data">
				<view class="app-customer_data_flex">
					<tui-icon name="kefu" size="28" color="#FFFFFF"></tui-icon>
					<text class="kefu_text">在线客服</text>
				</view>
				
			</button>
		</view>
        <!-- <tui-modal :show="true"  title="提示" content="确定退出登录吗？"></tui-modal> -->
    </view>
</template>

<script>
import Api from "../../services/index";
export default {
	components: {},
    data() {
        return {
            bannerList: [],  // 轮播图
            tipsList: [],  // 提示
        }; 
    },
    async onLoad() {
        let getBannerRes = await Api.getBanner();
        this.bannerList = getBannerRes.data;
        let tipsRes = await Api.getAlert();
        this.tipsList = tipsRes.data;
        setTimeout(() => {
            this.animation = true;
        }, 600);
    },
    methods: {
        navTo(url) {
            this.$href.navigateTo({ url: url });      
		},
    },
};
</script>

<style lang="scss">
.app-container {
	.space{
		height: 1rem;
	}
	.font-wight{
		font-size: 17px;font-weight:700;
	}
	.font-size{
		font-size: 11px;
	}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20rpx 30rpx 0;
    background: #f3f3f3;
    .tui-notice-board {
        width: 100%;
        padding-right: 30rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        height: 60rpx;
        background: rgba(255,217,188,0.5);
        display: flex;
        align-items: center;
        .tui-rolling-news {
            width: 100%;
            padding: 12rpx 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
        }

        .tui-swiper {
            font-size: 28rpx;
            height: 50rpx;
            flex: 1;
        }

        .tui-swiper-item {
            display: flex;
            align-items: center;
        }

        .tui-news-item {
            line-height: 28rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
			
        }
    }
    .tui-banner-box {
        width: 100%;
        box-sizing: border-box;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        // position: absolute;
        /* overflow: hidden; */
        // z-index: 99;
        // bottom: -80rpx;
        // left: 0;
        .tui-banner-swiper {
            width: 100%;
            height: 240rpx;
            border-radius: 12rpx;
            overflow: hidden;
            transform: translateY(0);
        }

        .tui-slide-image {
            width: 100%;
            height: 240rpx;
            display: block;
        }

        /* #ifdef MP-WEIXIN */
        .tui-banner-swiper .wx-swiper-dot {
            width: 8rpx;
            height: 8rpx;
            display: inline-flex;
            background: none;
            justify-content: space-between;
        }

        .tui-banner-swiper .wx-swiper-dot::before {
            content: "";
            flex-grow: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 16rpx;
            overflow: hidden;
        }

        .tui-banner-swiper .wx-swiper-dot-active::before {
            background-color: #fff;
        }

        .tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
            width: 16rpx;
        }

        /* #endif */

        /* #ifndef MP-WEIXIN */
        .tui-banner-swiper .uni-swiper-dot {
            width: 8rpx;
            height: 8rpx;
            display: inline-flex;
            background-color: none;
            justify-content: space-between;
        }

        .tui-banner-swiper .uni-swiper-dot::before {
            content: "";
            flex-grow: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 16rpx;
            overflow: hidden;
        }

        .tui-banner-swiper .uni-swiper-dot-active::before {
            background-color: #fff;
        }

        .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
            width: 16rpx;
        }
    }
    .banner-part {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 16rpx;
        .piece {
            width: calc(50% - 2rpx);
            height: 190rpx;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            .desc-box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                height: 100%;
                padding-left: 30rpx;
                .left {
                    width: 100rpx;
                    height: 100rpx;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    margin-right: 4rpx;
                }
                .left-1 {
                    background-image: url("../../static/index-1.png");
                }
                .left-2 {
                    background-image: url("../../static/index-2.png");
                }
                .left-3 {
                    background-image: url("../../static/index-3.png");
                }
                .left-4 {
                    background-image: url("../../static/index-4.png");
                }
                .right {
                    :nth-child(1) {
                        color: #000000;
                        font-size: 36rpx;
                    }
                    :nth-child(2) {
                        color: #7b7b7b;
                        font-size: 28rpx;
                    }
                }
            }
        }
        .bg-1 {
            background-image: url("../../static/index-bg-1.png");
            margin-right: 4rpx;
            margin-bottom: 4rpx;
        }
        .bg-2 {
            background-image: url("../../static/index-bg-2.png");
            margin-bottom: 4rpx;
        }
        .bg-3 {
            background-image: url("../../static/index-bg-3.png");
            margin-right: 4rpx;
        }
        .bg-4 {
            background-image: url("../../static/index-bg-4.png");
        }
    }
    .write-address-part {
        height: 110rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        width: 100%;
        padding: 0 30rpx;
        font-size: 28rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;
        > text {
            font-weight: bold;
        }
        > button {
            color: #fff;
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 30rpx;
            background-image: linear-gradient(to right, #ff9900, #ff7100);
        }
    }
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
.app-customer{
	position: fixed;
	right: 84rpx;
	bottom: 164rpx;
	.app-customer_data{
		width: 114rpx;
		height: 114rpx;
		border: 0px;
		line-height: 57rpx;
		background-color: #FF6C00;
		border-radius: 25rpx;
		.app-customer_data_flex{
			display: flex;
			flex-direction: column;
			.kefu_text{
				font-size: 22rpx;
				color: #FFFFFF;
			}
		}
		
	}
}
</style>
