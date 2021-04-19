<template>
<div class='app-container'>
    <div class="login-part">
       <div class="row title">欢迎登陆/注册</div> 
       <div class="row">
           <input type="text" placeholder="请输入手机号" placeholder-class="mobile">
       </div>
       <div class="row code-row">
           <input type="text" class="code" placeholder="请输入验证码" placeholder-class="code">
           <button class="get-code">获取验证码</button>
           <div class="desc">国外手机号接收不到验证码？</div>
       </div>
       <div class="row">
           <button class="login-btn">登录</button>
       </div>
       <div class="row auth-row">
           <button class="auth-login-btn">微信授权登录</button>
       </div>
    </div>
</div>
</template>

<script>

export default {
components: {},
data() {
return {

};
},
methods: {

},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
.app-container{
   .login-part{
       padding: 40rpx 76rpx 0;
       .title{
           color: #000000;
           font-size: 44rpx;
       }
       .row{
           position: relative;
           margin-bottom: 60rpx;
           .desc{
               position: absolute;
               right: 10rpx;
               font-size: 24rpx;
               color: #FF6C00;
               bottom: -44rpx;
           }
           > input{
               height: 80rpx;
               line-height: 80rpx;
               border-radius: 40rpx;
               font-size: 32rpx;
               background: #F3F3F3;
               padding-left: 40rpx;
           }
           .code{
               
           }
           .get-code{
               position: absolute;
               top: 10rpx;
               right: 10rpx;
               height: 60rpx;
               line-height: 60rpx;
               border-radius: 30rpx;
               font-size: 28rpx;
               color: #fff;
               background-image: linear-gradient(to right, #FF9900 , #FF7100);
           }
           .login-btn{
               color: #fff;
               height: 80rpx;
               line-height: 80rpx;
               border-radius: 40rpx;
               background-image: linear-gradient(to right, #FF9900 , #FF7100);
           }
           .auth-login-btn{
               width: 70%;
               color: #fff;
               height: 80rpx;
               line-height: 80rpx;
               background: #07C160;
           }
       }
       .code-row{
           margin-bottom: 100rpx;
       }
       .auth-row{
           padding-top: 200rpx;
       }

   }
}
</style>