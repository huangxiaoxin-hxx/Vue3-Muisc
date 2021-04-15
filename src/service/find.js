import axios from '../utils/axios'

export function getBanner() {
    return axios.get('/banner?type=2');
}

export function getDragonBall() {
    return axios.get('/homepage/dragon/ball');
}

export function getBlockPage() {
    return axios.get('/homepage/block/page');
}

export function getToplist() {
    return axios.get('/toplist')
}