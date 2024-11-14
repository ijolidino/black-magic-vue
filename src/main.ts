import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store/index.js';
createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(store)
    .mount('#app')

