import { domain, request } from '../utils/request'
export default {
    // 用户中心
    // 获取session
    // 请求参数：code，必填
    getAuthSession(data) {
        return request({
            url: 'auth/getSession',
            data,
            method: 'POST'
        })
    },
    // 用户注册登录
    // 请求参数：
    // encryptedData：获取手机号码加密数据，必填
    // iv：加密算法的初始向量，必填
    // openid：用户openid，必填
    // nickName：小程序用户昵称，必填
    // avatarUrl：小程序用户头像，必填
    // gender：小程序用户性别，必填
    authLogin(data) {
        return request({
            url: 'auth/login',
            data,
            method: 'POST'
        })
    },
    // 5. 用户信息 token
    getMemberInfo() {
        return request({
            url: 'member/getInfo',
            method: 'POST'
        })
    },
    // 首页
    // 获取首页banner列表
    getBanner(data) {
        return request({
            url: 'home/getBanner',
        })
    },
    // 系统公告
    // 请求参数：
    // position_id：1，//公告位置   
    getAlert(data) {
        return request({
            url: 'home/getAlert',
            data: {
                position_id: 1
            }
        })
    },

    // 优惠券管理
    // 优惠券列表
    // 请求参数：
    // page：1，//当前页
    // size：10，//每页显示的条数
    getCouponList(data) {
        return request({
            url: 'coupon/getList',
            data,
            method: 'GET'
        })
    },
    // 2. 领取优惠券
    //     请求参数：
    // header：token：XXXX，//用户登录token
    // coupon_id：1，//优惠券ID
    getCouponReceive(data) {
        return request({
            url: 'coupon/receive',
            data,
            method: 'POST'
        })
    },
    // 查询我的优惠券
    getMyCounponList(data) {
        return request({
            url: 'coupon/getMyList',
            data,
        })
    },
    // 地址薄
    // 收件地址薄
    // 请求参数：
    // page：1，//当前页
    getReceivedAddr() {
        return request({
            url: 'address/getReceived',
        })
    },
    // 寄件地址薄
    // 请求参数：
    // page：1，//当前页
    getMailAddr() {
        return request({
            url: 'address/getMail',
        })
    },
    // 删除地址薄
    // 请求参数：
    // address_id：1，//地址薄ID
    delAddress(data) {
        return request({
            url: 'address/delete',
            data,
            method: 'POST'
        })
    },
    // 5. 地址薄收件详情
    // 请求参数：
    // address_id：1，//地址薄ID
    getAddressDetail(data) {
        return request({
            url: 'address/getMail',
            data
        })
    },
    // 地址寄件薄详情 
    getPostDetail(data) {
        return request({
            url: 'address/getPostDetail',
            data
        })
    },

    // 设置默认地址
    // 请求参数：
    // address_id：1，//地址薄ID
    setDefaultAddr(data) {
        return request({
            url: 'address/setDefault',
            data,
            method: 'POST'
        })
    },
    // 意见反馈
    // 投诉类型
    getComplaintType(data) {
        return request({
            url: 'complaint/getType',
            data
        })
    },
    // 提交投诉建议
    // 请求参数：
    // type_id：1，投诉类型
    // mobile：18019932981，投诉手机号码
    // email：695753037@qq.com，投诉邮箱
    // contents：XXXXX，投诉类型
    // pic_urls：1.jpg,2.jpg,上传图片。多张以逗号分隔
    addComplaint(data) {
        return request({
            url: 'complaint/addComplaint',
            data,
            method: 'POST'
        })
    },
    // 获取订单列表获取订单列表
    getAllOrderList(data) {
        return request({
            url: 'order/getList',
            data,
            method: 'POST'
        })
    },
    // 获取订单详情
    getOrderInfo() {
        return request({
            url: 'order/getInfo',
            data,
            method: 'POST'
        })
    },
    // 删除订单 order_sn：订单id
    // user_id: 会员id
    delOrder() {
        return request({
            url: 'order/delete',
            data,
            method: 'POST'
        })
    },
    getWaitingPayList(data) {
        return request({
            url: 'order/intercept/getWaitingPayList',
            data,
            method: 'get'
        })
    },
    // 国内省市区 
    getRegion(data) {
        return request({
            url: 'address/getRegion',
            data,
            method: 'get'
        })
    },
    // 新增/编辑寄件地址
    addSendAddr(data) {
        return request({
            url: 'address/addPost',
            data,
            method: 'POST'
        })
    },
    // 寄件地址列表
    getSendAddrList(data) {
        return request({
            url: 'address/getPost',
            data,
            method: 'POST'
        })
    },
    // 设置默认地址
    setDefaultAddr(data) {
        return request({
            url: 'address/setDefault',
            data,
            method: 'POST'
        })
    },
    // 获取上传连接
    getUploadUrl() {
        return domain() + "member/upload";
    }
    },
	
	// 更新用户信息
	memberUpdate(data) {
		return request({
		    url: 'member/update',
		    data,
		    method: 'POST'
		})
	},
	// 自寄到仓国家
	warehouseCountry(data) {
		return request({
		    url: 'warehouse/getCountry',
		    data
		})
	},
	//自寄到仓详情
	warehouseDetail(data) {
		return request({
		    url: 'warehouse/getHouse',
		    data
		})
	},
	// 发送验证码
	sendSms(data) {
		return request({
		    url: 'auth/sendSms',
		    data,
			method: 'POST'
		})
	},
	// 验证码登录
	loginSms(data) {
		return request({
		    url: 'auth/loginSms',
		    data,
			method: 'POST'
		})
	},
	// 资金明细
	accountRecord(data) {
		return request({
		    url: 'finance/record',
		    data,
		})
	}
}