// 该文件用于创建Vuex中最为核心的store

// 引入 Vue
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'

// 应用 Vuex 插件
Vue.use(Vuex)

// 求和相关配置
const countOptions = {
    namespaced: true,
    actions: {
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
    },
    mutations: {
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
    },
    state: {
        sum: 0
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}

// 人员列表相关数据
const personOptions = {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if(value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('添加的人必须姓王！！')
            }
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            {id: 1, name: '张三'}
        ]
    }
}

// 创建并暴露store
export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }
})
