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

      ```js
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
    ```js
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

```js
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

    ```js
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

    ```js
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

    ```js
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

    ```js
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

    ```html
    <transition name="hello">
      <h1 v-show="isShow">你好！</h1>
    </transition>
    ```

    3. 备注：若有多个元素需要过渡，则需要使用：`<transition-group>`,且每个元素都要指定`key`值。

## vue脚手架配置代理

1. 方法一
 
在vue.config.js中添加如下配置：

```js
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

```js
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
*/
```

说明：

* 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。

* 缺点：配置略显繁琐，请求资源时必须加前缀。

## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件通信的方式，适用于 父组件 ==> 子组件。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

    * 默认插槽：

      ```html
      父组件中：
      <Category>
        <div>html结构1</div>
      </Category>
      子组件中：
      <template>
        <div>
          <!-- 定义插槽 -->
          <slot>插槽默认内容</slot>
        </div>
      </template>
      ```

    * 具名插槽：

      ```html
      父组件中：
      <Category>
        <template slot="center">
          <div>html结构1</div>
        </template>

        <template v-slot:footer>
          <div>html结构2</div>
        </template>
      </Category>
      子组件中：
      <template>
        <div>
          <!-- 定义插槽 -->
          <slot name="center">插槽默认内容</slot>
          <slot name="footer">插槽默认内容</slot>
        </div>
      </template>
      ```

    * 作用域插槽：

        1. 理解：数组在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在catagory组件中，但使用数据所遍历出来的结构由App组件来决定）

        2. 具体编码：

        ```html
        父组件中：
        <Category>
          <template scope="scopeDate">
            <!-- 生成的是ul列表 -->
            <ul>
              <li v-for="g in scopeDate.games" :key="g">{{g}}</li>
            </ul>
          </template>
        </Category>
        子组件中：
        <template>
          <div>
            <slot :games="games"></slot>
          </div>
        </template>
        <script>
          export default {
            name: 'Category',
            props: ['title'],
            // 数据在子组件自身
            data() {
              return {
                games: ['红色警戒', '穿越火线', '劲舞团', '超级毛利']
              }
            }
          }
        </script>
        ```

## vuex

1. 概念

在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中的多个组件的共享状态进行集中式的管理（读/写），也是一种组件间的通信的方式，且适用于任意组件间的通信。

2. 何时使用？

多个组件需要共享数据时

3. 搭建vuex环境

      1. 创建文件：`src/store/index.js`

          ```js
          // 引入Vue核心库
          import Vue from 'vue'
          // 引入Vuex
          import Vuex from 'vuex'
          // 应用Vuex组件
          Vue.use(Vuex) 

          // 准备actions对象（响应组件中用户的动作）
          const actions = {}
          // 准备mutations对象（修改state中的数据）
          const mutations = {}
          // 准备state对象（保存具体的数据）
          const state = {}

          // 创建并暴露store
          export default new Vuex.Store({
            actions,
            mutations,
            state
          })
          ```

      2. 在`main.js`中创建`vm`时传入`store`配置项

          ```js
          ...
          // 引入store
          import store from './store'
          ...

          // 创建vm
          new Vue({
            el: '#app',
            render: h => h(App),
            store
          })
          ```

4. 基本使用

    1. 初始化数据、配置actions、配置mutations，操作文件store.js

        ```js
        // 引入Vue核心库
        import Vue from 'vue'
        // 引入Vuex
        import Vuex from 'vuex'
        // 使用Vuex
        Vue.use(Vuex)

        const actions = {
          // 响应组件中加的动作
          jia(context, value) {
            context.conmmit('JIA', value)
          }
        }

        const mutations = {
          // 执行加
          JIA(state, value) {
            state.sum += value
          }
        }

        // 初始化数据
        const state = {
          sum: 0
        }

        // 创建并暴露store
        export default new Vuex.Store({
          actions,
          mutations,
          state
        })
        ```

    2. 组件中读取vuex中的数据：`$store.state.sum`

    3. 组件中修改vuex中的数据：`$store.dispatch('actions中的方法名', 数据)`或者`$store.commit('mutations中的方法名', 数据)`

> 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch，直接写commit。

## getters的使用

1. 概念：当state中的数据需要加工后再使用时，可以使用getters加工。

2. 在`store.js`中追加`getter`配置

```js
const getters = {
  bigSum(state) {
    return state.sum * 10
  }
}

// 创建并暴露store
export default new Vuex.Store({
  getters
})
```

3. 组件中读取数据：`$store.getters.bigSum`

## 四个map方法的使用

1. mapState方法：用于帮助我们映射state中的数据为计算属性

```js
computed() {
  // 借助mapState生成计算属性：sum、school、subject（对象写法）
  ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),

  // 借助mapState生成计算属性：sum、school、subject（数组写法）
  ...mapState(['sum', 'school', 'subject']),
}
```

2. mapGetters方法：用于帮助我们映射getters中的数据为计算属性

```js
computed() {
  // 借助mapGetters生成计算属性：bigSum（对象写法）
  ...mapGetters({bigSum: 'bigSum'}),

  // 借助mapGetters生成计算属性：bigSum（数组写法）
  ...mapGetters(['bigSum'])
}
```

3. mapActions方法：用于帮助我们生成与actions对话的方法，即：包含`$store.dispatch(xxx)`的函数

```js
methods() {
  // 靠mapActions生成：incrementOdd、incrementWait（对象形式）
  ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
  
  // 靠mapActions生成：incrementOdd、incrementWait（数组形式）
  ...mapActions(['jiaOdd', 'jiaWait'])
}
```

4. mapMutations方法：用于帮助我们生成与mutations对话的方法，即：包含` $store.commit(xxx)`的函数

```js
methods() {
  // 靠mapMutations生成：increment、decrement（对象形式）
  ...mapMutations({increment: 'JIA', decrement: 'JIAN'})

  // 靠mapMutations生成：JIA、JIAN（数组形式）
  ...mapMutations(['JIA', 'JIAN'])
}
```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要，在模版中绑定事件时传递好参数，否则参数是事件对象。

## 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改store.js

```js
const countAbout = {
  namespaced: true,
  state: { n: 1 },
  actions: { ... },
  mutations: { ... },
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced: true,
  state: { ... },
  actions: { ... },
  mutations: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

3. 开启命名空间后，组件中读取state数据：

```js
// 方式一：自己直接读取
this.$store.state.personAbout.list
// 方法二：借助mapState读取
...mapState('personAbout', ['sum', 'school', 'subject'])
```

4. 开启命名空间后，组件中读取getters数据：

```js
// 方式一：自己直接读取
this.$store.getters('personAbout/firstPersonName')
// 方式二：借助mapGetters读取
...mapGetters('countAbout', ['bigsum'])
```

5. 开启命名空间后，组件中调用dispatch：

```js
// 方式一
this.$store.dispatch('personAbout/addPersonWang', person)
// 方式二
...mapActions('countAbout', {incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
```

6. 开启命名空间后，组件中调用commit

```js
// 方式一
this.$store.commit('personAbout/ADD_PERDON', person)
// 方式二
...mapMutations('countAbout', {increment: 'JIA', decrement: 'JIAN'})
```

## 路由

1. 理解：一个路由（route）就是一组映射关系（key-value），多个路由需要路由器（router）进行管理。

2. 前端路由：key是路径，value是组件。

### 1.基本使用

1. 安装vue-router，命令：`npm i vue-router`

2. 应用插件：`Vue.use(VueRouter)`

3. 编写router配置项：

```js
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入路由组件
import About from '../components/About'
import Home from '../components/Home'

// 创建 router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    }
  ],
})

// 暴露router
export default router
```

### 4.实现切换（active-class可配置高亮样式）

```js
<router-link active-class="active" to="/about">About</router-link>
```
### 5.指定展示位置

```js
<router-view></router-view>
```

> 几个注意点

1. 路由组件通常存放在pages文件夹中，一般组件通常存放在components文件夹中。

2. 通过切换，隐藏了路由组件，默认是被销毁掉的，需要时候再去挂载。

3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。

4. 整个应用只有一个router，可以通过组件的`$router`属性获取到。