import { createApp } from 'vue'
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'
import store from './store/index'
import App from './App.vue'
import router from './router/index'
createApp(App)
    .use(router)
    .use(Element3)
    .use(store)
    .mount('#app')

