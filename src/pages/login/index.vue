<template>
    <div class="app-container">
        <div class="login-part">
            <div class="row title">欢迎登陆/注册</div>
            <div class="row">
                <input
                    type="text"
                    placeholder="请输入手机号"
                    placeholder-class="mobile"
                />
            </div>
            <div class="row code-row">
                <input
                    type="text"
                    class="code"
                    placeholder="请输入验证码"
                    placeholder-class="code"
                />
                <button class="get-code">获取验证码</button>
                <div class="desc">国外手机号接收不到验证码？</div>
            </div>
            <div class="row">
                <button class="login-btn" @click="handleLogin">登录</button>
            </div>
            <div class="row auth-row">
                <tui-button
                    class="login-btn"
                    @click="showLo"
                    :disabled="loginBtn"
                    open-type="getPhoneNumber"
                    @getphonenumber="getPhoneNumber"
                    size="30"
                    type="green"
                    background="#00c25f!important;"
                    :loading="loginBtn"
                >
                    微信用户一键登录
                </tui-button>
                <!-- <button class="auth-login-btn">微信授权登录</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import Api from "../../services/index";
export default {
    components: {},
    data() {
        return {
            loginBtn: false,
        };
    },
    methods: {
        async getPhoneNumber(e) {
            wx.hideLoading();
            let userInfo = this.$cache.get("userInfo");
            // 授权未允许
            if (!e.encryptedData) {
                this.loginBtn = false;
                return false;
            }
            let openid = this.$cache.get("openId");
            let postData = {
                avatarUrl: userInfo.avatarUrl,
                gender: userInfo.gender,
                encryptedData: e.encryptedData,
                iv: e.iv,
                nickName: userInfo.nickName,
                openid,
            };
            let res = await this.login(postData);
            if (res.data.token) {
                this.$cache.put("token", res.data.token);
                uni.showToast({
                    title: "登录成功",
                    icon: "success",
                    duration: 100,
                });
                setTimeout(() => {
                    uni.reLaunch({
                        url: "/pages/index/index",
                    });
                }, 100);
            } else {
                uni.showToast({
                    title: res.message || res.status,
                    icon: "none",
                    duration: 500,
                });
            }
        },
        // 登录
        login(postData) {
            return new Promise((resolve, reject) => {
                Api.authLogin(postData).then((res) => {
                    if (res.data.token) {
                        resolve(res);
                    } else {
                        uni.showToast({
                            title: res.message,
                            duration: 1000,
                            icon: "none",
                        });
                    }
                });
            });
        },
        showLo() {
            this.loginBtn = true;
            wx.showLoading({
                title: "加载中",
                mask: true,
            });
        },
        handleLogin() {
            const _this = this;
            uni.login({
                provider: "weixin",
                async success(res) {
                    console.log(res);
                    if (res.code) {
                        //发起网络请求
                        let code2sessionKey = await Api.getAuthSession({
                            code: res.code,
                        });
                        _this.$cache.put(
                            "openId",
                            code2sessionKey.data.open_id
                        );
                        console.log("res====》", code2sessionKey);
                    } else {
                        console.log("登录失败！" + res.errMsg);
                    }
                },
            });
        },
    },
    created() {},
    mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
    .login-part {
        padding: 40rpx 76rpx 0;
        .title {
            color: #000000;
            font-size: 44rpx;
        }
        .row {
            position: relative;
            margin-bottom: 60rpx;
            .desc {
                position: absolute;
                right: 10rpx;
                font-size: 24rpx;
                color: #ff6c00;
                bottom: -44rpx;
            }
            > input {
                height: 80rpx;
                line-height: 80rpx;
                border-radius: 40rpx;
                font-size: 32rpx;
                background: #f3f3f3;
                padding-left: 40rpx;
            }
            .code {
            }
            .get-code {
                position: absolute;
                top: 10rpx;
                right: 10rpx;
                height: 60rpx;
                line-height: 60rpx;
                border-radius: 30rpx;
                font-size: 28rpx;
                color: #fff;
                background-image: linear-gradient(to right, #ff9900, #ff7100);
            }
            .login-btn {
                color: #fff;
                height: 80rpx;
                line-height: 80rpx;
                border-radius: 40rpx;
                background-image: linear-gradient(to right, #ff9900, #ff7100);
            }
            .auth-login-btn {
                width: 70%;
                color: #fff;
                height: 80rpx;
                line-height: 80rpx;
                background: #07c160;
            }
        }
        .code-row {
            margin-bottom: 100rpx;
        }
        .auth-row {
            padding-top: 200rpx;
        }
    }
}
</style>