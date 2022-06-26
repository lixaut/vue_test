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
  * 第二步使用混合：

    * 全局混入：`Vue.mixin(xxx)`

    * 局部混入：`mixins: [xxx]`