<template>
  <div class="demo">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'

  export default {
    name: 'School',
    data() {
      return {
        name: 'XAUT',
        address: 'xian',
      }
    },
    methods: {
      demo(msgName, data) {
        console.log('hello消息收到了', data)
      }
    },
    mounted() {
      // this.$bus.$on('hello', (data) => {
      //   console.log('我是School组件，接受到了学生数据：', data)
      // })
      this.pubId = pubsub.subscribe('hello', this.demo)
    },
    beforeDestroy() {
      // this.$bus.$off('hello')
      pubsub.unsubscribe(this.pubId)
    },
  }
</script>

<style scoped>
  .demo {
    background-color: orange;
  }
</style>