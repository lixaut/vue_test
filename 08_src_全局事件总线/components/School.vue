<template>
  <div class="demo">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'School',
    data() {
      return {
        name: 'XAUT',
        address: 'xian',
      }
    },
    mounted() {
      this.$bus.$on('hello', (data) => {
        console.log('我是School组件，接受到了学生数据：', data)
      })
    },
    beforeDestroy() {
      this.$bus.$off('hello')
    },
  }
</script>

<style scoped>
  .demo {
    background-color: orange;
  }
</style>