
export default {
    install(Vue, x, y, z) {
        console.log(x, y, z)

        // 定义全局过滤器
        Vue.filter('mySlice', function(value) {
            return value.slice(0, 2)
        })

        // 定义全局指令
        Vue.directive('fbind', {
            // 指令与元素绑定时
            bind(element, binding) {
                element.value = binding.value
            },
            // 指令与所在元素被插入页面时
            inserted(element, binding) {
                element.focus()
            },
            // 指令所在模版被重新解析时
            update(element, binding) {
                element.value = binding.value
            }
        })

        // 定义全局混入
        Vue.mixin({
            data() {
                return {
                    x: 100,
                    y: 200
                }
            }
        })

        // 给Vue原型上添加一个方法（vm 和 vc都可以使用）
        Vue.prototype.hello = () => {
            alert('hello world')
        }
    }
}