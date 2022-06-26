// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入插件
import plugins from './plugins.js'
// 关闭生产提示
Vue.config.productionTip = false
// 应用插件
Vue.use(plugins, 1, 2, 3)

// 创建Vue
new Vue({
  el: '#app',
  render: h => h(App)
})