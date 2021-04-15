import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import store from './store'

import router from './router'

import Vant from 'vant';



const app = createApp(App)

app.use(router)
app.use(Vant)
app.use(store)

app.mount('#app')