import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:3001' : 'http://1.14.144.212:3001/'
// axios.defaults.baseURL = "http://1.14.144.212:3001/"
axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['withCredentials'] = true

axios.interceptors.response.use(res => {
    // if (res.data && res.data.code == 502) {
    //     Toast.fail(res.data.msg)
    //     return
    // }
    // if (typeof res.data !== 'object') {
    //     Toast.fail('服务端异常！')
    //     return Promise.reject(res)
    // }
    // if (res.data.resultCode != 200) {
    //     if (res.data.message) Toast.fail(res.data.message)
    //     if (res.data.resultCode == 416) {
    //         router.push({ path: '/login' })
    //     }
    //     return Promise.reject(res.data)
    // }

    return res
})

export default axios
