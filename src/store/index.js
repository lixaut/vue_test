// 该文件用于创建Vuex中最为核心的store

// 引入 Vue
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'

// 应用 Vuex 插件
Vue.use(Vuex)

// 准备actions 用于响应组件中的动作
const actions = {
    /*
    jia(context, value) {
        context.commit('JIA', value)
        // console.log(context)
    },
    jian(context, value) {
        context.commit('JIAN', value)
    },
    */
    jiaOdd(context, value) {
        if(context.state.sum % 2) {
            context.commit('JIAODD', value)
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit('JIAWAIT', value)
        }, 1000)
    }
}
// 准备mutations 用于操作数据（state）
const mutations = {
    JIA(state, value) {
        state.sum += value
    },
    JIAN(state, value) {
        state.sum -= value
    },
    JIAODD(state, value) {
        state.sum += value
    },
    JIAWAIT(state, value) {
        state.sum += value
    }
}
// 准备state 用于存储数据
const state = {
    sum: 0
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})
