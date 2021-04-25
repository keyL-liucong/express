import {get } from './cache';
const BASE_URL = 'https://api.51mitui.com/';
export const request = (params) => {
    return new Promise((resolve, reject) => {
        if (params.loading) {
            uni.showLoading({
                title: '加载中'
            });
        }
        uni.request({
            url: BASE_URL + params.url, //仅为示例，并非真实接口地址。
            data: params.data,
            method: params.method || 'GET', // 默认值 GET
            header: {
                'token': get('token') || '', //自定义请求头信息
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                resolve(res.data);
                console.log('请求成功', res.data);
            },
            fail: (err) => {
                reject(err);
                console.log('请求失败', err);
            },
            complete: () => {
                if (params.loading) {
                    uni.hideLoading();
                }
            }
        });
    })
}