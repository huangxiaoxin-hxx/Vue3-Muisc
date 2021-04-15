import axios from '../utils/axios'

export function getSongs(id) {
    return axios.get('/song/url?id=' + id);
}

export function getSearch(id) {
    return axios.get("/search?keywords=" + id);
}

// 歌单详情
export function getPlayListDetail(id) {
    return axios.get("/playlist/detail?id=" + id);
}

// 收藏/取消收藏歌单
export function subscribePlayList(params) {
    return axios.post("/playlist/subscribe", params);
}

// 歌曲详情 /cloudsearch?keywords=
export function getPlayerDetail(id) {
    return axios.get("/cloudsearch?keywords=" + id);
}

// mp3url /song/url
export function getPlayerUrl(id) {
    return axios.get("/song/url?id=" + id);
}

// 检测音乐是否可用  /check/music
export function checkSong(id, br) {
    return axios.get("/check/music", {
        params: {
            id,
            br
        }
    });
}