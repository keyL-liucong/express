import { request } from '../../utils/request'
export function getBanner(data) {
    return request({
        url: 'home/getBanner',
        data
    })
}