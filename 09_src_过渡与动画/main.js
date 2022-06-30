// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'

// 关闭生产提示
Vue.config.productionTip = false


// 创建Vue
new Vue({
  el: '#app',
  render: h => h(App),
  // 安装全局总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})