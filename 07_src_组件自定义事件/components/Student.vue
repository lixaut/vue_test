<template>
  <div class="demo">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给App</button>
    <button @click="unbind">解绑XAUT事件</button>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        name: '张三',
        sex: '男'
      }
    },
    methods: {
      sendStudentName() {
        // 触发 Student 组件实例身上的 xaut 事件
        this.$emit('xaut', this.name, 1, 2, 3)
        this.$emit('demo')
      },
      // 解绑一个自定义事件
      unbind() {
        // 解绑一个自定义事件
        // this.$off('xaut')

        // 解绑多个自定义事件
        this.$off(['xaut', 'demo'])

        // 解绑全部自定义事件
        // this.$off()
      }
    }
  }
</script>

<style scoped>
  .demo {
    background-color: skyblue;
  }
</style>