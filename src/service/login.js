import axios from '../utils/axios'
import { setStore } from '../utils/storage'
import { Toast } from 'vant'
import router from '../router'

export function loginByPhone(params) {
    // return axios.post(`/login/cellphone?phone=${params.phone}&password=${[params.password]}`);
    axios.post('/login/cellphone', params).then((res) => {
        console.log(res)
        setStore("username", params.phone)
        setStore("token", res.data.token)
        Toast.success('登录成功');
        router.push({ path: '/Home' })
    })
}
export function loginByEmail(params) {
    // return axios.post(`/login/cellphone?phone=${params.phone}&password=${[params.password]}`);
    axios.post('/login', params).then((res) => {
        console.log(res)
        setStore("username", params.phone)
        setStore("token", res.token)
        Toast.success('登录成功');
        router.push({ path: '/Home' })
    })
}