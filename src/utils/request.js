const BASE_URL = '';
export const request = (url, data, method = 'GET', loading = true) => {
    return new Promise((resolve, reject) => {
        if (loading) {
            uni.showLoading({
                title: '加载中'
            });
        }
        uni.request({
            url: BASE_URL + url, //仅为示例，并非真实接口地址。
            data,
            method, // 默认值 GET
            header: {
                'token': 'hello W' //自定义请求头信息
            },
            success: (res) => {
                resolve(res);
                console.log('请求成功', res);
            },
            fail: (err) => {
                reject(err);
                console.log('请求失败', err);
            },
            complete: () => {
                if (loading) {
                    uni.hideLoading();
                }
            }
        });
    })
}