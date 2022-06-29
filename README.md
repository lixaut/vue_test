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