// import {createStore} from 'vuex'
//
// const store = createStore({
//
//     mutations: {
//         add(state) {
//             state.count++
//         }
//     }
// })
// export default store

// import { createStore } from 'vuex'

// 创建一个新的 store 实例
// const store = createStore({
//     state () {
//         return {
//             count: 666
//         }
//     },
//     mutations: {
//         increment (state) {
//             state.count++
//         }
//     }
// })
//
// export default store


import {createStore} from 'vuex'
// import { createStore } from './gvuex'

const store = createStore({
    state(){
        return {
            count:666
        }
    },
    getters:{
        double(state){
            return state.count*2
        }
    },
    mutations:{
        add(state){
            state.count++
        }
    },
    actions:{
        asyncAdd({commit}){
            setTimeout(()=>{
                commit('add')
            },1000)
        }
    }
})

export default store
