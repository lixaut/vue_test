<template>
  <div class="demo">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudent">把学生姓名给Schoo组件</button>
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
      sendStudent() {
        this.$bus.$emit('hello', this.name)
      }
    }
  }
</script>

<style scoped>
  .demo {
    background-color: skyblue;
  }
</style>