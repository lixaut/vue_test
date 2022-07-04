// 引入 Vue
import Vue from "vue"
// 引入 App
import App from "./App.vue"
// 引入 store
import store from './sotre'

// 关闭生产提示
Vue.config.productionTip = false

// 创建 Vue
new Vue({
    el: '#app',
    render: h => h(App),
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
})