import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store/index.js';
import Element3 from 'element3';
createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(store)
    .use(Element3)
    .mount('#app')

window.onerror = function(e){
console.log(['https://stackoverflow.com/search?q=[js]+'+e])
}