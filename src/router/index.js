import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Search from '../views/search/index.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: "Login",
            component: Login
        },
        {
            path: '/Home',
            name: "Home",
            component: Home,
        },
        {
            path: '/Search',
            name: "Search",
            component: Search,
        },
        {
            path: '/SongsList',
            name: "SongsList",
            component: () => import(/* webpackChunkName: "home" */ '../views/songs/songsList.vue'),
            // meta: {
            //     requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
            // }
        },
        {
            path: '/FavoritesList',
            name: "FavoritesList",
            component: () => import('../views/songs/FavoritesList.vue'),
        },
        {
            path: '/searchSongs',
            name: "searchSongs",
            component: () => import('../views/search/searchSongs.vue'),
        }
    ]
})

export default router