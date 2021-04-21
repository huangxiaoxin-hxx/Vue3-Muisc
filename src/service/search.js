import axios from '../utils/axios'

export function getSearchDefault() {
    return axios.get('/search/default');
}

export function getSearchHot() {
    return axios.get('/search/hot/detail')
}

export function getSearList(text) {
    return axios.get('/search?keywords=' + text);
}

// 更全搜索
export function getSearchSongs({ keywords, limit = 30, offset = 1 }) {
    return axios.get('/cloudsearch', {
        params: {
            keywords: keywords,
            limit: limit,
            offset: offset
        }
    });
}
// 综合搜索 /search/multimatch
export function getSearchType({ keywords, type }) {
    return axios.get('/search', {
        params: {
            keywords,
            type
        }
    });
}