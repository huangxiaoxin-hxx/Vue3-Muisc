import axios from '../utils/axios'

export function getSearchDefault() {
    return axios.get('/search/default');
}