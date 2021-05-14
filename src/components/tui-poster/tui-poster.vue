<template>
	<view class="uni-image">
		<canvas @click.stop="" class="canvas-element" canvas-id="my-canvas"></canvas>
		<view class="uni-image-close tui-center">
			<tui-button type="warning" width="240rpx" height="80rpx" :size="24" @click="saveImage">保存图片</tui-button>
			
		</view>
	</view>
</template>

<script>
	var context = null;
	export default {
		name: 'tuiPoster',
		props: {
			headerImg: {
				type: String,
				default: 'https://static.51mitui.com/default/invite.png'
			},
			showModel: {
				type: Boolean,
				default: false
			},
			code: {
				type: String,
				default: ''
			},
			codeImg: {
				type: String,
				default: 'http://static.51mitui.com/20210514/daa51a6691d4da132add7dcd0dc33427.png'
			}
		},
		data() {
			return {
				defaultImage:"https://static.51mitui.com/default/invite.png"
			}
		},
		methods: {
			saveImage() {
				uni.getSetting({
					success(res) {
						if (Object.keys(res.authSetting).length > 0) {
							//判断是否有相册权限
							if (res.authSetting['scope.writePhotosAlbum'] == undefined) {
								//打开设置权限
								uni.openSetting({
									success(res) {
										console.log('设置权限', res.authSetting)
									}
								})
							} else {
								if (!res.authSetting['scope.writePhotosAlbum']) {
									//打开设置权限
									uni.openSetting({
										success(res) {
											console.log('设置权限', res.authSetting)
										}
									})
								}
							}
						} else {
							return
						}
					}
				})
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
								setTimeout(() => {
									that.isShow = false
								}, 2000)
							}
						})
					},
					fail: function(err) {
						console.error(JSON.stringify(err))
					}
				})
			},
		},
		created() {
			
			uni.showLoading({
				title:"生成中"
			})
			context = uni.createCanvasContext('my-canvas', this)
			let hW = uni.upx2px(600);
			let hH = uni.upx2px(1000);

			context.drawImage(this.headerImg, 0, 0, hW, hH)
			let fontSize = uni.upx2px(32);
			console.log(fontSize)
			context.setFontSize(fontSize)
			context.setFillStyle('#FFFFFF');
			context.fillText(this.code, 52, 455)

			let codeW = uni.upx2px(160);
			let codeH = uni.upx2px(160);

			context.drawImage(this.codeImg, 194, 386, codeW, codeH)
	
			//延迟渲染
			setTimeout(()=>{
				context.draw(true,()=>{
					uni.hideLoading()
				})
			},500)
		}
	};
</script>

<style lang='scss' scoped>
	.canvas-element-wrapper {
		display: block;
		margin-bottom: 100rpx;
	}

	.canvas-element {
		width: 600rpx;
		height: 1000rpx;
	}

	.uni-image-close {
		margin-top: 20px;
		text-align: center;
	}
</style>
