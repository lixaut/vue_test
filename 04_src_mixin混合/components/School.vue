<template>
  <div>
    <h2 @click="showName">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>

  </div>
</template>

<script>
  // 第一种 局部混合
  // import {a} from '../mixin.js'
  // import {b} from '../mixin.js'

  export default {
    name: 'School',
    data() {
      return {
        name: 'XAUT',
        address: 'xian',
        x: 99
      }
    },

    // 第一种 局部混合
    // mixins: [a, b],
    
    mounted() {
      console.log('!!!')
    }
  }
</script>