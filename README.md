# 笔记

## ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）

2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上事组件实例对象（vc）

3. 使用方式：

   * 打标识：`<h1> ref="xxx">...</h1>`或`<School ref="xxx"></School>`。

   * 获取：`this.$refs.xxx`。

## 配置项props

1. 功能：让组件接受外部传过来的数据

   * 传递数据：`<Demo name="xxx"/>`

   * 接受数据：

     1. 第一种方式（只接受）：`props: ['name']`

     2. 第二种方式（限制类型）：`props: { name: String }`

     3. 第三种方式（限制类型、限制必要性、指定默认值）：

      ```
      props: {
        name: {
          type: String,
          required: true,
          default: '老王'
        }
      }
      ```
2. 备注：props是只读的，Vue底层会监测对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## mixin（混入）

1. 功能：可以把多个组件公用的配置提取成一个混入对象。

2. 使用方式：

   * 第一步定义混合：
    ```
    {
      data() { ... },
      methods: { ... },
      ...
    }
    ```
   * 第二步使用混入：

     * 全局混入：`Vue.mixin(xxx)`

     * 局部混入：`mixins: [xxx]`

## 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

```
对象.install = function (Vue, options) {
  // 1. 添加过滤器
  Vue.filter(...)

  // 2. 添加全局指令
  Vue.directive(...)

  // 3. 配置全局混入
  Vue.mixin(...)

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function () {...}
  Vue.prototype.$myProperty = xxx
}
```

4. 使用插件：`Vue.use()`

## scoped样式

1. 作用：让样式在局部生效，防止冲突。

2. 写法：`<style scoped></style>`

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：子组件 --> 父组件 通信。

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件回调在A中）。

3. 绑定自定义事件：

    * 第一种，在父组件中`<Demo @xaut="test"/`或`<Demo v-on:xaut="test"/`

    * 第二种，在父组件中：

    ```
    <Demo ref="demo"/>
    ...
    mounted() {
      this.$refs.xxx.$on('xaut', this.test)
    }
    ```

    * 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。

4. 触发自定义事件：`this.$emit('xaut', 数据)`

5. 解绑自定义事件：`this.$off('xaut')`

6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符。

7. 注意：通过`this.$refs.xxx.$on('xaut', 回调)`绑定自定义事件时，回调要么配置在methods中，要么使用尖头函数，否则this指向会出问题。

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于任意组件间通信。

2. 安装全局事件总线：

    ```
    new Vue({
      ...
      beforeCreate() {
        // 安装全局事件总线，$bus就是当前应用的vm
        Vue.prototype.$bus = this
      },
      ...
    })
    ```

3. 使用事件总线：

    * 接受数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。

    ```
    methods: {
      demo(data) { ... }
    },
    ...
    mounted() {
      this.$bus.$on('xx', this.demo)
    }
    ```

    * 提供数据：`this.$bus.$emit('xx', 数据)`

4. 最好在`beforeDestroy`钩子中，用`$off()`去解绑当前组件绑定在总线上的事件。

## 消息订阅与发布（pubsub）

1. 一种组件间通信方式，适用于任意组件间通信。

2. 使用步骤：

    1. 安装pubsub：`npm i pubsub-js`

    2. 引入：`import pubsub from 'pubsub-js'`

    3. 接受数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。

    ```
    methods: {
      demo(data) {
        ...
      }
    },
    ...
    mounted() {
      this.pid = pubsub.subscribe('xxx', this.demo)
    }
    ```

    4. 提供数据：`pubsub.publish('xxx', 数据)`

    5. 最好在beforeDestroy钩子中，用`pubsub.unsubscribe(pid)`去取消订阅。

## Vue封装的过渡与动画

1. 作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。

2. 写法：

    1. 准备好样式：

        * 元素进入的样式：

            1. v-enter：进入的起点
            2. v-enter-active：进入过程中
            3. v-enter-to：进入的终点

        * 元素离开的样式：

            1. v-leave：离开的起点
            2. v-leave-active：离开的过程中
            3. v-leave-to：离开的终点

    2. 使用`<transition>`包裹要过渡的元素，并配置name属性：

    ```
    <transition name="hello">
      <h1 v-show="isShow">你好！</h1>
    </transition>
    ```

    3. 备注：若有多个元素需要过渡，则需要使用：`<transition-group>`,且每个元素都要指定`key`值。

## vue脚手架配置代理

1. 方法一
 
在vue.config.js中添加如下配置：

```
devServer: {
  proxy: 'http://localhost:5000'
}
```

说明：

  * 优点：配置简单，请求资源时直接发给前端（8080）即可。

  * 缺点：不能配置多个代理，不能灵活控制请求是否走代理。

  * 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源）。

2. 方法二

编写vue.config.js配置具体代理规则：

```
module.exports = {
  devserver: {
    proxy: {
      '/api1': {  // 匹配所有以‘/api1’开头的请求路径
        target: 'http://localhost:5000',  // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {
        target: 'http://localhost:5001,
        changeOrigin: true,
        pathRewrite: {'/api2': ''}
      }
    }
  }
}
/*
  changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
  changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
  changeOrigin默认值为true
```

说明：

* 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。

* 缺点：配置略显繁琐，请求资源时必须加前缀。