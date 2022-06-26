// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
import {a, b} from './mixin.js'
// 关闭生产提示
Vue.config.productionTip = false

// 第二种 混和
Vue.mixin(a)
Vue.mixin(b)

// 创建Vue
new Vue({
  el: '#app',
  render: h => h(App)
})