// 
import axios from '../utils/axios'

export function getUserInfo() {
    return axios.get('/user/account');
}

export function getUserDetail(id) {
    console.log(id + 'detail')
    return axios.get('/user/detail?uid=' + id);
}

export function getUserSubcount() {
    return axios.get('/user/subcount');
}
// /我的喜欢
export function getLikelist(id) {
    return axios.get('/likelist?uid=' + id);
}

// 歌单 /user/playlist
export function getUserPlaylist(id) {
    return axios.get('/user/playlist?uid=' + id);
}

// 我喜欢的歌曲 
export function likeMusicList(id) {
    return axios.get('/likelist?uid=' + id);
}

// 退出登录 /logout
export function loginOut(id) {
    return axios.get('/logout?uid=' + id);
}